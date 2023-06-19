const db = require("../models/index");
const { getAllBrand, createBrand } = require("./brandService");
const { Op, sequelize } = require("sequelize");
const {getLeafCategories} = require("./categoryService")
/*
{
  name,
  description,
  seller_id,
  rate,
  number_of_rating
  item_specific: [
    {
      origin_id,
      name,
      price,
      number_sold
    }
  ]
}
*/
const searchItems = (searchTerm) => {
  return new Promise(async (resolve, reject) => {
    try {
      let items = await db.items.findAll({
        where: {
          name: {
            [Op.like]: `%${searchTerm}%`,
          },
        },
      });
      resolve(items);
    } catch (error) {
      reject(error);
    }
  });
}
const getRate = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let rates = await db.rates.findAll({
        where: { item_id: id },
      });

      // Fetch user data for each rate
      const ratePromises = rates.map(async (rate) => {
        const user = await db.users.findOne({
          where: { id: rate.user_id },
          attributes: ["name", "avatar"],
        });
        return {
          id: rate.id,
          rating: rate.rate,
          title: rate.title,
          comment: rate.comment,
          item_id: rate.item_id,
          user: {
            id: rate.user_id,
            name: user.name,
            avatar: user.avatar,
          },
        };
      });

      // Wait for all user data to be fetched
      const formattedRates = await Promise.all(ratePromises);
      resolve(formattedRates);
    } catch (error) {
      reject(error);
    }
  });
};

const itemImage = (id, imagePath) => {
  return new Promise(async (resolve, reject) => {
    try {
      const itemspec = await db.itemspecific.findAll({
        where: { origin_id: id },
      });

      await itemspec.forEach((item, index) => {
        item.img = imagePath[index];
        item.save();
      });
      const result = await db.itemspecific.findAll({
        where: { origin_id: id },
      });
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

const createItemV2 = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let newBrand;
      if (data.brand) {
        const brand = await getAllBrand();
        const brandName = brand.map((brandItem) => brandItem.name);
        const lowerCaseBrands = brandName.map((b) => b.toLowerCase());
        const lowerCaseDataBrand = data.brand.toLowerCase();
        if (lowerCaseBrands.includes(lowerCaseDataBrand)!==true) {
          newBrand = await createBrand(lowerCaseDataBrand);
        } else {
          newBrand = brand.find(item => item.name.toLowerCase() === lowerCaseDataBrand);
        }
      }
      const newItem = await db.items.create({
        name: data.name,
        description: data.description,
        seller_id: data.seller_id,
        rate: 0,
        number_of_rating: 0,
        number_sold: 0,
        category_id: data.category_id ? data.category_id : null,
        brand_id: newBrand ? newBrand.id : null,
      });
      const seller = await db.sellers.findOne({
        where: { id: data.seller_id },
      });
      seller.number_of_products += 1;
      await seller.save();
      let listItemSpec = [];
      for (let itemspec of data.item_specific) {
        let itemSpecific = await db.itemspecific.create({
          origin_id: newItem.id,
          name: itemspec.name,
          price: itemspec.price,
        });
        listItemSpec.push(itemSpecific);
      }
      
      if (data.tag && Array.isArray(data.tag)) {
        for (let tagId of data.tag) {
          await db.tagitem.create({
            item_id: newItem.id,
            tag_id: tagId,
          });
        }
      }
      let result = {
        newItem,
        listItemSpec,
      };
      resolve(result);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

const createItem = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newItem = await db.items.create({
        name: data.name,
        description: data.description,
        seller_id: data.seller_id,
        rate: 0,
        number_of_rating: 0,
      });
      const seller = await db.sellers.findOne({
        where: { id: data.seller_id },
      });
      seller.number_of_products = seller.number_of_products++;
      await seller.save();
      resolve(newItem);
    } catch (error) {
      reject(error);
    }
  });
};

const updateItem = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const item = await db.items.findOne({
        where: { id: data.id },
      });
      if (item) {
        if (data.name) item.name = data.name;
        if (data.description) item.description = data.description;
        await item.save();
        let updatedItem = await db.items.findOne({
          where: { id: data.id },
        });
        resolve(updatedItem);
      } else throw new Error("Item did not existed");
    } catch (error) {
      reject(error);
    }
  });
};

const deleteItem = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const deleteItem = await db.items.findOne({
        where: { id: id },
      });
      if (deleteItem) {
        await db.items.destroy({
          where: { id: id },
        });
        resolve("Deleted successfully");
      } else throw new Error("Item did not existed");
    } catch (error) {
      reject(error);
    }
  });
};
const getItemByCategory = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      // TODO: can not reference db.brands
      const leafcategories = await getLeafCategories(id);
      leafcategories.push(id);
      let items = await db.items.findAll({
        where: { category_id: {[Op.in]: leafcategories} },
        raw: true,
      });
      let branditem = await db.branditem.findAll();
      let branditem1 = {}
      for (let i = 0; i < branditem.length; i++) {
        branditem1[branditem[i].item_id] = branditem[i].brand_id
      }
      items = items.map((item) => {
        return {...item, brand_id: branditem1[item.id]}
      })
      // Fetch item-specific data for each item

      const itemsWithSpecific = await Promise.all(
        items.map(async (item) => {
          // Get the item-specific data
          const itemSpecific = await getOneItemSpecific(item.id);
          // Merge the item-specific data (img and price) into the item object
          const itemWithSpecific = {
            ...item,
            img: itemSpecific && itemSpecific.img ? itemSpecific.img : "",
            price: itemSpecific && itemSpecific.price ? itemSpecific.price : 0,
          };

          return itemWithSpecific;
        })
      );

      resolve(itemsWithSpecific);
    } catch (error) {
      reject(error);
    }
  });
};

const getAllItem = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const items = await db.items.findAll({
        raw: true,
      });

      // Fetch item-specific data for each item
      const itemsWithSpecific = await Promise.all(
        items.map(async (item) => {
          // Get the item-specific data
          const itemSpecific = getOneItemSpecific(item.id);

          // Merge the item-specific data (img and price) into the item object
          const itemWithSpecific = {
            ...item,
            img: itemSpecific && itemSpecific.img ? itemSpecific.img : "",
            price: itemSpecific && itemSpecific.price ? itemSpecific.price : 0,
          };

          return itemWithSpecific;
        })
      );

      resolve(itemsWithSpecific);
    } catch (error) {
      reject(error);
    }
  });
};

const getItemBySellerId = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const items = await db.items.findAll({
        where: {
          seller_id: id,
        },
        raw: true,
      });

      // Fetch item-specific data for each item
      const itemsWithSpecific = await Promise.all(
        items.map(async (item) => {
          // Get the item-specific data
          const itemSpecific = await getOneItemSpecific(item.id);

          // Merge the item-specific data into the item object
          const itemWithSpecific = {
            ...item,
            img: itemSpecific && itemSpecific.img ? itemSpecific.img : "",
            price: itemSpecific && itemSpecific.price ? itemSpecific.price : 0,
          };

          return itemWithSpecific;
        })
      );

      resolve(itemsWithSpecific);
    } catch (error) {
      reject(error);
    }
  });
};

const getItemById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const items = await db.items.findAll({
        where: { id: id },
        raw: true,
      });

      // Fetch item-specific data for each item
      const itemsWithSpecific = await Promise.all(
        items.map(async (item) => {
          // Get the item-specific data
          const itemSpecific = await getOneItemSpecific(item.id);

          // Merge the item-specific data (img and price) into the item object
          const itemWithSpecific = {
            ...item,
            img: itemSpecific && itemSpecific.img ? itemSpecific.img : "",
            price: itemSpecific && itemSpecific.price ? itemSpecific.price : 0,
          };

          return itemWithSpecific;
        })
      );

      resolve(itemsWithSpecific);
    } catch (error) {
      reject(error);
    }
  });
};

const createItemSpecific = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let originItem = await db.items.findOne({
        where: { id: data.origin_id },
      });
      if (originItem) {
        const newItemSpecific = db.itemspecific.create({
          origin_id: data.origin_id,
          name: data.name,
          price: data.price,
        });
        resolve(newItemSpecific);
      } else throw new Error("Origin item did not existed");
    } catch (error) {
      reject(error);
    }
  });
};

const getOneItemSpecific = (origin_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let items = "";
      items = await db.itemspecific.findOne({
        where: { origin_id: origin_id },
      });
      resolve(items);
    } catch (error) {
      reject(error);
    }
  });
};

const getItemSpecificByOriginId = (origin_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let items = "";
      items = await db.itemspecific.findAll({
        where: { origin_id: origin_id },
      });
      resolve(items);
    } catch (error) {
      reject(error);
    }
  });
};

const updateItemSpecific = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let item = "";
      item = await db.itemspecific.findOne({
        where: { id: data.id },
      });
      if (item) {
        if (data.name) item.name = data.name;
        if (data.price) item.price = data.price;
        await item.save();
        let updatedItem = await db.itemspecific.findOne({
          where: { id: data.id },
        });
        resolve(updatedItem);
      } else throw new Error("Item did not existed");
    } catch (error) {
      reject(error);
    }
  });
};

const deleteItemSpecific = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let item = await db.itemspecific.findOne({
        where: { id: id },
      });
      if (item) {
        await db.itemspecific.destroy({
          where: { id: id },
        });
        resolve("Delete successfully");
      } else throw new Error("Item did not exist");
    } catch (error) {
      reject(error);
    }
  });
};

const getItemByTagId = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const items = await db.items.findAll({
        where: {
          tag_id: id,
        },
        raw: true,
      });

      // Fetch item-specific data for each item
      const itemsWithSpecific = await Promise.all(
        items.map(async (item) => {
          // Get the item-specific data
          const itemSpecific = await getOneItemSpecific(item.id);

          // Merge the item-specific data into the item object
          const itemWithSpecific = {
            ...item,
            img: itemSpecific.img,
            price: itemSpecific.price,
          };

          return itemWithSpecific;
        })
      );

      resolve(itemsWithSpecific);
    } catch (error) {
      reject(error);
    }
  });
};

const getItemByBrandId = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const items = await db.branditem.findAll({
        where: { brand_id: id },
      });

      const itemId = items.map((item) => item.item_id);

      const itemList = await Promise.all(
        itemId.map(async (oneItemId) => {
          const item = await db.items.findOne({
            where: { id: oneItemId },
          });

          // Get the item-specific data
          const itemSpecific = await getOneItemSpecific(item.id);

          // Merge the item-specific data (img and price) into the item object
          const itemWithSpecific = {
            ...item.dataValues,
            img: itemSpecific && itemSpecific.img ? itemSpecific.img : "",
            price: itemSpecific && itemSpecific.price ? itemSpecific.price : 0,
          };

          return itemWithSpecific;
        })
      );

      resolve(itemList);
    } catch (error) {
      reject(error);
    }
  });
};

const getItemInRange = (minPrice, maxPrice) => {
  return new Promise(async (resolve, reject) => {
    try {
      const items = await db.items.findAll({
        raw: true,
      });

      // Fetch item-specific data for each item
      const itemsWithSpecific = await Promise.all(
        items.map(async (item) => {
          // Get the item-specific data
          const itemSpecific = await getOneItemSpecific(item.id);

          // Merge the item-specific data (img and price) into the item object
          const itemWithSpecific = {
            ...item,
            img: itemSpecific && itemSpecific.img ? itemSpecific.img : "",
            price: itemSpecific && itemSpecific.price ? itemSpecific.price : 0,
          };

          return itemWithSpecific;
        })
      );

      // Filter items based on price range
      const filteredItems = itemsWithSpecific.filter((item) => {
        if (minPrice && item.price < minPrice) {
          return false; // Item's price is below the minimum price
        }
        if (maxPrice && item.price > maxPrice) {
          return false; // Item's price is above the maximum price
        }
        return true; // Item's price is within the specified range
      });

      resolve(filteredItems);
    } catch (error) {
      reject(error);
    }
  });
};

const getItemFilter = (filterData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const items = await db.items.findAll({
        raw: true,
      });

      // Fetch item-specific data for each item
      const itemsWithSpecific = await Promise.all(
        items.map(async (item) => {
          // Get the item-specific data
          const itemSpecific = await getOneItemSpecific(item.id);

          // Fetch the brand IDs for the item from the branditem table
          const brandItems = await db.branditem.findAll({
            where: {
              item_id: item.id,
            },
            raw: true,
          });

          // Extract the brand IDs from brandItems
          const brandIds = brandItems.map((brandItem) => brandItem.brand_id);

          // Merge the item-specific data (img, price, and brand_id) into the item object
          const itemWithSpecific = {
            ...item,
            img: itemSpecific && itemSpecific.img ? itemSpecific.img : "",
            price: itemSpecific && itemSpecific.price ? itemSpecific.price : 0,
            brand_id: brandIds,
          };

          return itemWithSpecific;
        })
      );

      // Filter items based on provided data
      const filteredItems = itemsWithSpecific.filter((item) => {
        if (
          filterData.brand_id &&
          !item.brand_id.includes(filterData.brand_id)
        ) {
          return false; // Item's brand does not match the provided brand
        }
        if (filterData.id && item.id !== filterData.id) {
          return false; // Item's ID does not match the provided ID
        }
        if (filterData.seller_id && item.seller_id !== filterData.seller_id) {
          return false; // Item's seller ID does not match the provided seller ID
        }
        if (filterData.minPrice && item.price < filterData.minPrice) {
          return false; // Item's price is below the minimum price
        }
        if (filterData.maxPrice && item.price > filterData.maxPrice) {
          return false; // Item's price is above the maximum price
        }
        if (
          filterData.category_id &&
          item.category_id !== filterData.category_id
        ) {
          return false; // Item's category does not match the provided category
        }
        return true; // Item matches all provided filters
      });

      resolve(filteredItems);
    } catch (error) {
      reject(error);
    }
  });
};

const getItemsByName = async (searchText) => {
  return new Promise(async (resolve, reject) => {
    try {
      let items = await db.items.findAll({
        where: {
          name: {
            [Op.regexp]: `\\b${searchText}\\b|\\b${searchText}.+|.+${searchText}\\b`,
          },
        },
        raw: true,
      });
      const firstWord = searchText.split(" ")[0];
      console.log(firstWord);
      const categories = await db.categories.findAll({
        where: {
          name: {
            [Op.like]: `%${firstWord}%`,
          },
        },
        raw: true,
      });
      console.log(categories);
      if (categories.length > 0) {
        items = items.filter((item) => {
          return categories.some(
            (category) => category.id === item.category_id
          );
        });
      }
      // Fetch item-specific data for each item
      const itemsWithSpecific = await Promise.all(
        items.map(async (item) => {
          // Get the item-specific data
          const itemSpecific = await getOneItemSpecific(item.id);

          // Merge the item-specific data (img and price) into the item object
          const itemWithSpecific = {
            ...item,
            img: itemSpecific && itemSpecific.img ? itemSpecific.img : "",
            price: itemSpecific && itemSpecific.price ? itemSpecific.price : 0,
          };

          return itemWithSpecific;
        })
      );

      resolve(itemsWithSpecific);
    } catch (error) {
      reject(error);
    }
  });
};
const getItemRecommendations = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const items = await db.items.findAll({
        order: [
          [db.sequelize.literal('number_sold DESC')], // Order by price in descending order
        ],
        limit: 50,
        raw: true,
      });

      // Fetch item-specific data for each item
      const itemsWithSpecific = await Promise.all(
        items.map(async (item) => {
          // Get the item-specific data
          const itemSpecific = await db.itemspecific.findOne({
            where: {
              origin_id: item.id,
            },
            raw: true,
          });

          // Merge the item-specific data (img and price) into the item object
          const itemWithSpecific = {
            ...item,
            img: itemSpecific && itemSpecific.img ? itemSpecific.img : "",
            price: itemSpecific && itemSpecific.price ? itemSpecific.price : 0,
          };

          return itemWithSpecific;
        })
      );

      resolve(itemsWithSpecific);
    } catch (error) {
      reject(error);
    }
  });
}
module.exports = {
  getAllItem,
  getItemBySellerId,
  createItem,
  updateItem,
  deleteItem,
  getItemById,
  createItemSpecific,
  getItemSpecificByOriginId,
  updateItemSpecific,
  deleteItemSpecific,
  createItemV2,
  itemImage,
  getItemByTagId,
  getItemByBrandId,
  getItemInRange,
  getItemFilter,
  getItemsByName,
  getRate,
  getItemByCategory,
  getItemRecommendations,
};

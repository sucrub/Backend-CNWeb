# Backend-CNWeb

__Chỉ pull từ branch main__

## Hướng dẫn setup
* Lên xampp tạo database tên là cnweb, để nó rỗng đừng thêm bảng gì
* npm install
* npx sequelize-cli db:migrate
* Lệnh trên sẽ tự tạo bảng trong xampp luôn
* node src/populateData.js
* Lệnh trên sẽ tạo data cho database, muốn thêm gì thì sửa file này nhé, Work in progress still

## List API
__req.body tổng hợp hết vào một object__

__req.body có () tức là có hoặc không đều được, còn lại là bắt buộc__

__API có endpoint có {} thì là req.params, ví dụ muốn lấy data user có id là 1 thì chỉ cần http://localhost:8080/user/get-user-by-id/1__

### Auth
Endpoint       |	Method |	Description |	Request Body | Note
---------------|---------|--------------|--------------|------
http://localhost:8080/auth/login |	POST |	Login |	username, password | Cấp accessToken
http://localhost:8080/auth/refresh-token | POST | N/A | Refresh token | 
http://localhost:8080/user/create-user |	POST |	Create user |	username, password, name, phone_number
http://localhost:8080/seller/create-seller |	POST |	Create seller |	username, password, name, phone_number

### User
Endpoint       |	Method |	Description |	Request Body | Note
---------------|---------|--------------|--------------|------
http://localhost:8080/user/get-all-user |	GET |	Get all users |	N/A
http://localhost:8080/user/get-user-by-id/{id} |	GET |	Get user by ID |	N/A
http://localhost:8080/user/get-user-by-id/{username} |	GET |	Get user by username |	N/A
http://localhost:8080/user/update-user |	POST |	Update user |	username, (first_name, last_name, phone_number)
http://localhost:8080/user/update-password |	POST |	Update user password |	username, old_password, new_password, confirm_password
http://localhost:8080/user/change-avatar/{id} | POST | Change avatar user | N/A | Upload file

### Seller
Endpoint       |	Method |	Description |	Request Body | Note
---------------|---------|--------------|--------------|------
http://localhost:8080/seller/get-all-seller |	GET |	Get all sellers |	N/A
http://localhost:8080/seller/get-seller-by-id/{id} |	GET |	Get seller by ID |	N/A
http://localhost:8080/seller/get-seller-by-name-prefix/{prefix} |	GET |	Get seller by name prefix |	N/A
http://localhost:8080/seller/update-seller |	POST |	Update seller |	username, (name, address, phone_number, description)
http://localhost:8080/seller/update-password |	POST |	Update seller password |	username, old_password, new_password, confirm_password
http://localhost:8080/seller/change-avatar/{id} | POST | Change avatar seller | N/A | Upload file

### Item
Endpoint       |	Method |	Description |	Request Body | Note
---------------|---------|--------------|--------------|------
http://localhost:8080/item/get-all-item |	GET |	Get all items |	N/A
http://localhost:8080/item/get-item-by-seller-id/{seller_id} |	GET |	Get items by seller ID |	N/A
http://localhost:8080/item/get-item-by-id/{id} |	GET |	Get item by ID |	N/A
http://localhost:8080/item/update-item |	POST |	Update item |	id, (name, description)
http://localhost:8080/item/delete-item/{id} |	DELETE |	Delete item |	N/A
http://localhost:8080/item/get-item-specific-by-origin-id/{origin_id} |	GET |	Get specific item by origin ID |	N/A
http://localhost:8080/item/update-specific-item |	POST |	Update specific item |	id, (name, price)
http://localhost:8080/item/delete-specific-item/{id} |	DELETE |	Delete specific item |	N/A
http://localhost:8080/item/create-item-v2| POST | Create item including item specific | Note bên dưới
http://localhost:8080/item/item-picture/:id} | POST | Push item spec image when creating item | N/A | Upload file

### Order
Endpoint       |	Method |	Description |	Request Body | Note
---------------|---------|--------------|--------------|------
http://localhost:8080/order/get-order-by-id/{id} | GET | Get order by order id | N/A
http://localhost:8080/order/get-order-by-user-id/{user_id} | GET | Get order by user id | N/A
http://localhost:8080/order/create-order | POST | Get order by order id | Note bên dưới
http://localhost:8080/order/get-order-by-seller-id/{seller_id} | GET | Get order by seller id | N/A

### Note cho một số API
Req.body của create item v2:
```js
{
    "name": "Test item 5",
    "description": "test desc",
    "seller_id": 1,
    "brand": "Nokia", // có hoặc không đều được
    "item_specific": [
        {
            "name": "test 1",
            "price": 20000
        },
        {
            "name": "test 2",
            "price": 20000
        }
    ]
}
```

Req.body của create order: 
```js
{
    "user_id": 2,
    "ship_address": "HaNoi",
    "order_detail": [
        {
            "item_id": 3,
            "quantity": 3
        },
        {
            "item_id": 2,
            "quantity": 1
        }
    ]
}
```


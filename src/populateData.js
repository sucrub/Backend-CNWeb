const db = require("./models");
const sequelize = db.sequelize;
const bcrypt = require("bcrypt");
const fs = require("fs");

const userData = fs.readFileSync("src/data/user.json");
const user = JSON.parse(userData);
const userCount = user.length;
console.log("Number of elements in user array:", userCount);

const chunkSize = 1000;
const totalChunks = Math.ceil(userCount / chunkSize);

async function populate() {
  console.log(
    `Will rewrite the MySQL example database, adding ${userCount} users in ${totalChunks} chunks.`
  );

  for (let i = 0; i < totalChunks; i++) {
    const start = i * chunkSize;
    const end = start + chunkSize;
    const chunk = user.slice(start, end);

    // Bulk create users with bcrypt-hashed passwords
    const hashedUsers = await Promise.all(
      chunk.map(async (userData) => {
        return {
          ...userData,
          password: await bcrypt.hash(userData.password, 10),
        };
      })
    );
    await sequelize.models.users.bulkCreate(hashedUsers);

    console.log(`Chunk ${i + 1} processed.`);
  }

  console.log("Dummy data population completed.");
}

populate().catch(console.error);

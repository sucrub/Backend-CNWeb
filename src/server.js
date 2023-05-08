const express = require("express");
const initRouters = require("./routes/web");
const cors = require("cors");
const app = express();
require("dotenv").config();
const connectionDatabase = require("./connection/database");

const PORT = process.env.PORT || 8000;
const HOSTNAME = process.env.HOST_NAME;
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

connectionDatabase();
initRouters(app);

app.listen(PORT, HOSTNAME, async () => {
  console.log(`Server is running on port ${PORT}`);
});

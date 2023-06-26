require("dotenv").config();
const express = require("express");
const initRouters = require("./routes/web");
const cookieParser = require("cookie-parser");

const cors = require("cors");

const app = express();
app.use(cors());

const connectionDatabase = require("./connection/database");

const PORT = process.env.PORT || 8080;
const HOSTNAME = process.env.HOST;
app.use(cookieParser());

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use(express.urlencoded({ extended: true }));

connectionDatabase();
initRouters(app);

app.listen(PORT, HOSTNAME, async () => {
  console.log(`Server is running on port ${PORT}`);
});

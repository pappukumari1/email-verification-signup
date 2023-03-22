const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./Apis/router/route");
require("dotenv").config();

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("database connected..."))
  .catch((error) => console.log("database connected...",error));
const app = express();
app.use(cors());

app.use(express.json());
app.use("/api",routes);
app.listen(process.env.PORT, () => {
  console.log(`server started at ${process.env.PORT}`);
});

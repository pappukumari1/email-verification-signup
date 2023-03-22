const express = require("express");
const { postController, postLoginController, verifyUserEmail } = require("../controller/controller");
const routes = express.Router();
console.log("routers====");
routes.get("/user/confirm/:confirmationCode",verifyUserEmail)
routes.post("/post", postController);
routes.post("/postlogin",postLoginController)

module.exports = routes;

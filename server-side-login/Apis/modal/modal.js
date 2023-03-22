const mongoose = require("mongoose");
const userSchemaData = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  status:{
    type:String,
    enum:["Pending", "Active"],
    default:"Pending"
  },
ConfirmantionCode:{
  type:String,
  unique:true
}
});
const user = mongoose.model("singup", userSchemaData);

module.exports = user;

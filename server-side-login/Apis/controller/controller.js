const bcrypt = require("bcryptjs");
const express = require("express");
const jwt = require("jsonwebtoken");
const user = require("../modal/modal");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail", // true for 465, false for other ports
  auth: {
    user: "dhangar2526@gmail.com",
    pass: "ehilihpyovcsgmum",
  },
})

const sendConfirmationEmail = async (name, email, ConfirmantionCode) => {
  console.log("sendConfirmationEmail mahi=====09");

  await transporter
    .sendMail({
        //  { console.log("sajal=====")},
        from: "dhangar2526@gmail.com",
        to: email,
        subject: "Confirm your account",
    //     html: `<h1>Email Confirmation</h1>
    // <h2>Hello,${name}</h2>
    // <p>Thank you for register. Please confirm your email by clicking on the following link</p>
    // <a href=http://localhost:3000/confirm/${ConfirmantionCode}> Click here</a>
    // </div>`,
      }
     
    ).catch((err) => {
      console.log("Email Sending Error: 2134567890-=============3245678906578", err);
    });
};

const postController = async (req, res) => {
  try {
    console.log("");
    const { firstName, lastName, email, password } = req.body;
    const isExist = await user.findOne({ email });
    if (isExist) {
      return res.send({ status: false, message: "email already exist" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashpass = bcrypt.hashSync(password, salt);
    const token = jwt.sign({ email: req.body.email }, process.env.SECRET_KEY, {
      expiresIn: 180,
    });
    const temp = {
      firstName,
      lastName,
      email,
      password: hashpass,
      ConfirmantionCode: token,
    };
    console.log("mahi==========");
    
    // const data = await user.create(temp);
    console.log("temp=========09", temp);
    console.log("ConfirmantionCode====", temp.ConfirmantionCode);
    try {
      console.log("rajo======");
        sendConfirmationEmail(
        temp.ConfirmantionCode,
        temp.firstName,
        temp.email
      );

      console.log("aaru========");
    } catch (error) {
      console.log("sendConfirmationEmail===464575758548758778557=", error);
      // return res.send("sendConfirmationEmail====", error);
    }
    const data = await user.create(temp);

    console.log("sendConfirmationEmail====");
    res.status(200).send({
      data: data,
      message: "Registration Successfull, please verify email before login...",
      status: true,
    });
  } catch (error) {
    return res.send({
      message: "Registration failed, something went wrong....",
      status: false,
    });
  }
};
const verifyUserEmail = async (req, res) => {
  const data = await user.findOneAndUpdate(
    { ConfirmantionCode: req.params.ConfirmantionCode },
    { status: "Active" }
  );
  return res.send({ data: data, message: "account confirm", status: true });
};
const postLoginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (email && password) {
      const data = await user.findOne({ email });
      if (!data) {
        return res.send({ message: "email not found", status: 400 });
      }
      const checkPass = bcrypt.compareSync(password, data.password);
      console.log("checkPass", checkPass);
      if (!checkPass) {
        return res.send({ message: "password invalid", status: 400 });
      }
      console.log("data mahi 1234====", data);
      if (data) {
        console.log("data==", data);
        const { email, password, _id } = data;
        const token = jwt.sign({ userId: _id }, process.env.SECRET_KEY, {
          expiresIn: "1h",
        });
        console.log("token====", token);
        const temp = { email, password, _id };

        temp.token = token;
        console.log("temp token==", temp);

        if (temp.email === req.body.email) {
          return res.send({ message: "login succesfully", status: 200 });
        } else {
          return res.send({ message: "failed" });
        }
      }
    } else {
      return res.send({ message: "all filed required", status: 400 });
    }
  } catch (error) {
    return res.send({ message: error.message, status: 400 });
  }
};
module.exports = { postController, postLoginController, verifyUserEmail };

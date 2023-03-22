const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail", // true for 465, false for other ports
  auth: {
    user: "dhangar2526@gmail.com",
    pass: "ehilihpyovcsgmum",
  },
});

const sendConfirmationEmail = async (name, email, ConfirmantionCode) => {
  console.log("sendConfirmationEmail mahi=====09");

  await transporter
    .sendMail(
      console.log("sajal====="),
      {
        //  { console.log("sajal=====")},
        from: "dhangar2526@gmail.com",
        to: { name: "Mahi", address: "pappukumari2526@gmail.com" },
        subject: "Confirm your account",
        html: `<h1>Email Confirmation</h1>
    <h2>Hello,${name}</h2>
    <p>Thank you for register. Please confirm your email by clicking on the following link</p>
    <a href=http://localhost:3000/confirm/${ConfirmantionCode}> Click here</a>
    </div>`,
      },
      console.log("sajal==== sahu=")
    )
    .catch((err) => {
      console.log("Email Sending Error: ", err);
    });
};
// module.exports = sendConfirmationEmail;

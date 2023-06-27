import nodemailer from "nodemailer";
import nodemailerConfig from "./nodemailerConfig.js";
import sgMail from "@sendgrid/mail";

// const sendEmailEthearal = async ({ to, subject, html }) => {
//   let testAccount = await nodemailer.createTestAccount();

//   const transporter = nodemailer.createTransport(nodemailerConfig);

//   return transporter.sendMail({
//     from: '"My guy" <foo@example.com>', // sender address
//     to,
//     subject,
//     html,
//   });
// };

const sendEmail = async ({ to, subject, html }) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to,
    from: "rickbhughey@gmail.com", // Change to your verified sender
    subject,
    text: "and easy to do anywhere, even with Node.js",
    html,
  };
  // const info = await sgMail.send(msg);
  // res.json(info);
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

export default sendEmail;

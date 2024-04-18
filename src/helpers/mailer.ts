import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import User from "@/models/user.model";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hasedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hasedToken,
        verifyTokenExpire: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hasedToken,
        forgotPasswordExpire: Date.now() + 3600000,
      });
    }

    // ye sabhi .env file me store karna hai direct nahi likhna hai host and port also user and pass par abhi ke liye chal jayega
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "f8465cb50a70a0", //❌
        pass: "84b5ff224c79a6", //❌
      },
    });

    const mailOptions = {
      from: "rahulgurjar@gmail.com",
      to: email,
      subject: emailType === "VERIFY" ? "Verify Email" : "Reset Password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hasedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      } or copy and paste the link below in your browser.
            <br>${process.env.DOMAIN}/verifyemail?token=${hasedToken}
            </p>`,
    };

    const mainlResponse = await transport.sendMail(mailOptions);
    return mainlResponse;
  } catch (error: any) {
    throw new Error(error);
  }
};

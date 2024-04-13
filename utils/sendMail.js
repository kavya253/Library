import test from "node:test"
import nodemailer from "nodemailer"

const transport = await nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'burley.kassulke96@ethereal.email',
        pass: 'NnumKTxUDzX2PMwwZq'
    }
});
let sendMail=async(otp,email)=>{await transport.sendMail({
    from: 'kavyap253@gmail.com', 
    to: email, 
    subject: "updatePassword link", 
    text: `the update password link is : http://localhost:5000/users/updatePassword, otp: is ${otp}`
})
}
export default sendMail
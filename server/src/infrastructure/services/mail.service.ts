import nodemailer from 'nodemailer'

export const sendVerificationEmail = async(email:string,token:string)=>{
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.MAIL_USER,
            pass:process.env.MAIL_PASS,
        }
    })
    const verificationLink = `${process.env.CLIENT_URL}/api/users/verify-email/${token}`
    await transporter.sendMail({
       from: `"DripLab" <${process.env.MAIL_USER}>`,
    to: email,
    subject: 'Verify your DripLab account',
    html: `
      <h2>Welcome to DripLab 👋</h2>
      <p>Click the link below to verify your email address:</p>
      <a href="${verificationLink}">Verify Email</a>
    `,
    })
}

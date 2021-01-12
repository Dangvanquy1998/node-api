
const nodeMailer = require('nodemailer')


const adminEmail = 'vanquy200498@gmail.com'
const adminPassword = 'dangvanquy200498'

const mailHost = 'smtp.gmail.com'

const mailPort = 587

const sendMail = (to, subject, content) => {
  const transporter = nodeMailer.createTransport({
    host: mailHost,
    port: mailPort,
    secure: false, 
    auth: {
      user: adminEmail,
      pass: adminPassword
    }
  })

  const options = {
    from: adminEmail,
    to: to,
    subject: subject,
    html: content
  }

  
  return transporter.sendMail(options)
}

module.exports = {
  sendMail: sendMail
}
const nodemailer = require('nodemailer')

async function sendContactEmailController(req, res) {
    try {
        const { name, email, message } = req.body

        if (!name || !email || !message) {
            return res.status(400).json({
                message: 'Please provide name, email, and message.'
            })
        }

        const emailUser = process.env.EMAIL_USER?.trim()
        const emailPass = process.env.EMAIL_PASS ? process.env.EMAIL_PASS.replace(/\s+/g, '') : ''
        const hasRealEmailConfig =
            emailUser &&
            emailPass &&
            emailUser !== 'your_gmail@gmail.com' &&
            emailPass !== 'your_16_digit_app_password'

        let transporter
        let isTestAccount = false

        if (hasRealEmailConfig) {
            transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: emailUser,
                    pass: emailPass
                }
            })
        } else {
            // Automatic fallback so it works out-of-the-box without errors
            const testAccount = await nodemailer.createTestAccount()
            isTestAccount = true
            transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                secure: false,
                auth: {
                    user: testAccount.user,
                    pass: testAccount.pass
                }
            })
        }

        const receiverEmail = hasRealEmailConfig
            ? (process.env.CONTACT_RECEIVER_EMAIL || emailUser).trim()
            : 'support@interviewai.com'

        const info = await transporter.sendMail({
            from: `"${name} (InterviewAI Contact)" <${hasRealEmailConfig ? emailUser : email}>`,
            replyTo: email,
            to: receiverEmail,
            subject: `New Contact Query from ${name} - InterviewAI`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            html: `
                <div style="font-family: Segoe UI, sans-serif; padding: 24px; background: #0d1117; color: #e6edf3; border-radius: 12px; max-width: 600px;">
                    <h2 style="color: #ff2d78; margin-top: 0;">New Contact Query — InterviewAI</h2>
                    <p><strong>From Name:</strong> ${name}</p>
                    <p><strong>Reply-To Email:</strong> <a href="mailto:${email}" style="color: #ff6b9d;">${email}</a></p>
                    <hr style="border: none; border-top: 1px solid #2a3348; margin: 16px 0;" />
                    <p style="white-space: pre-wrap; line-height: 1.6; color: #e6edf3;">${message}</p>
                </div>
            `
        })

        const previewUrl = isTestAccount ? nodemailer.getTestMessageUrl(info) : null
        if (previewUrl) {
            console.log('\n📩 New Contact Message Received!')
            console.log(`From: ${name} <${email}>`)
            console.log(`Message: ${message}`)
            console.log(`Preview Email in Browser: ${previewUrl}\n`)
        }

        return res.status(200).json({
            message: 'Thank you! Your message has been sent successfully.',
            previewUrl
        })
    } catch (error) {
        console.error('Error sending contact email:', error)
        return res.status(500).json({
            message: 'Failed to send email. Please try again later.'
        })
    }
}

module.exports = {
    sendContactEmailController
}

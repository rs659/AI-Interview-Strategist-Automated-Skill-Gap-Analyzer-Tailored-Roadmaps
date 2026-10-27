const nodemailer = require('nodemailer')

async function createEmailTransporter() {
    const emailUser = process.env.EMAIL_USER?.trim()
    const emailPass = process.env.EMAIL_PASS ? process.env.EMAIL_PASS.replace(/\s+/g, '') : ''
    const hasRealEmailConfig =
        emailUser &&
        emailPass &&
        emailUser !== 'your_gmail@gmail.com' &&
        emailPass !== 'your_16_digit_app_password'

    if (hasRealEmailConfig) {
        return {
            transporter: nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: emailUser,
                    pass: emailPass
                }
            }),
            fromEmail: emailUser,
            isTest: false
        }
    }

    // Fallback to ethereal for testing/development
    const testAccount = await nodemailer.createTestAccount()
    return {
        transporter: nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass
            }
        }),
        fromEmail: testAccount.user,
        isTest: true
    }
}

async function sendOtpEmail({ toEmail, otp, username }) {
    const { transporter, fromEmail, isTest } = await createEmailTransporter()

    const info = await transporter.sendMail({
        from: `"InterviewAI Security" <${fromEmail}>`,
        to: toEmail,
        subject: `Your Password Reset OTP: ${otp} - InterviewAI`,
        text: `Hello ${username || 'User'},\n\nYour OTP to reset your password is: ${otp}\n\nThis OTP is valid for 10 minutes. If you did not request this, please ignore this email.`,
        html: `
            <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 28px; background: #0d1117; color: #e6edf3; border-radius: 12px; border: 1px solid #2a3348;">
                <div style="text-align: center; margin-bottom: 24px;">
                    <h2 style="color: #ff2d78; margin: 0; font-size: 24px; font-weight: 700;">Interview<span style="color: #ffffff;">AI</span></h2>
                    <p style="color: #8b949e; font-size: 13px; margin-top: 4px;">Password Reset Verification</p>
                </div>
                <p style="font-size: 15px; color: #e6edf3; line-height: 1.6;">Hello <strong>${username || 'User'}</strong>,</p>
                <p style="font-size: 14px; color: #8b949e; line-height: 1.6;">
                    We received a request to reset your password. Use the verification code below to set a new password:
                </p>
                <div style="text-align: center; margin: 28px 0;">
                    <div style="display: inline-block; background: rgba(255, 45, 120, 0.12); border: 1px solid #ff2d78; padding: 14px 32px; border-radius: 10px; font-size: 32px; font-weight: 800; letter-spacing: 8px; color: #ff6b9d;">
                        ${otp}
                    </div>
                </div>
                <p style="font-size: 13px; color: #8b949e; line-height: 1.6;">
                    ⚠️ This code will expire in <strong>10 minutes</strong>. Never share this code with anyone.
                </p>
                <hr style="border: none; border-top: 1px solid #2a3348; margin: 24px 0;" />
                <p style="font-size: 12px; color: #586069; text-align: center; margin: 0;">
                    If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.
                </p>
            </div>
        `
    })

    const previewUrl = isTest ? nodemailer.getTestMessageUrl(info) : null
    if (previewUrl) {
        console.log(`\n🔑 [Password Reset OTP] Code ${otp} generated for ${toEmail}`)
        console.log(`Preview email in browser: ${previewUrl}\n`)
    }

    return { previewUrl }
}

module.exports = {
    createEmailTransporter,
    sendOtpEmail
}

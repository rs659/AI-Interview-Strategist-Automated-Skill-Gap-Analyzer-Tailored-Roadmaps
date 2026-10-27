const userModel = require('../models/user.models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dns = require('dns').promises
const tokenBlacklistModel = require('../models/blacklist.model')

const ALLOWED_EMAIL_DOMAINS = [
    'gmail.com',
    'googlemail.com',
    'yahoo.com',
    'yahoo.co.in',
    'yahoo.co.uk',
    'ymail.com',
    'outlook.com',
    'hotmail.com',
    'live.com',
    'msn.com'
]

/**
 * Validates that the email format is authentic, belongs to Google, Yahoo, or Outlook,
 * and has valid MX records for mail delivery.
 */
async function validateEmailProvider(email) {
    if (!email || typeof email !== 'string') {
        return { valid: false, message: 'Please provide a valid email address.' }
    }

    const trimmed = email.trim().toLowerCase()
    const emailRegex = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/
    const match = trimmed.match(emailRegex)

    if (!match) {
        return { valid: false, message: 'Invalid email address format.' }
    }

    const [localPart, domain] = trimmed.split('@')

    if (localPart.length < 3) {
        return { valid: false, message: 'Email username must be at least 3 characters long.' }
    }

    if (!ALLOWED_EMAIL_DOMAINS.includes(domain)) {
        return {
            valid: false,
            message: 'Please use a valid organizational email address.'
        }
    }

    // Verify domain authenticity via DNS MX lookup (fallback to true if offline)
    try {
        const mxRecords = await dns.resolveMx(domain)
        if (!mxRecords || mxRecords.length === 0) {
            return { valid: false, message: `Email domain @${domain} cannot receive mail.` }
        }
    } catch (err) {
        // If DNS fails due to local network issues, still trust the strict allowlist
    }

    return { valid: true, normalizedEmail: trimmed }
}

/**
 * @name registerUserController
 * @description register a new user, expects username,
 * email and password in the request body
 * @access Public
 */
async function registerUserController(req, res) {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({
            message: 'Please provide username, email and password'
        })
    }

    const emailCheck = await validateEmailProvider(email)
    if (!emailCheck.valid) {
        return res.status(400).json({
            message: emailCheck.message
        })
    }

    const normalizedEmail = emailCheck.normalizedEmail

    const isUserAlreadyExists = await userModel.findOne({
        $or: [{ username }, { email: normalizedEmail }]
    })

    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: 'Account already exists with this email address or username'
        })
    }
    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email: normalizedEmail,
        password: hash
    })
    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    )
    res.cookie('token', token)

    res.status(201).json({
        message: 'User registered successfully',
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

/**
 * @name loginUserController
 * @description login a user, expects email and password in the request body
 * @access Public
 */
async function loginUserController(req, res) {
    const { email, password } = req.body

    const emailCheck = await validateEmailProvider(email)
    if (!emailCheck.valid) {
        return res.status(400).json({
            message: emailCheck.message
        })
    }

    const normalizedEmail = emailCheck.normalizedEmail
    const user = await userModel.findOne({ email: normalizedEmail })

    if (!user) {
        return res.status(400).json({
            message: 'Invalid email or password'
        })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(400).json({
            message: 'Invalid email or password'
        })
    }
    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    )
    res.cookie('token', token)
    res.status(200).json({
        message: 'User loggedIn successfully.',
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

/**
 * @name logoutUserController
 * @description logout a user and blacklist token
 * @access Public
 */
async function logoutUserController(req, res) {
    const token = req.cookies.token

    if (token) {
        await tokenBlacklistModel.create({ token })
    }
    res.clearCookie('token')

    res.status(200).json({
        message: 'User logged out successfully'
    })
}

async function getMeController(req, res) {
    try {
        const token = req.cookies?.token
        if (!token) {
            return res.status(200).json({ user: null })
        }

        const isTokenBlacklisted = await tokenBlacklistModel.findOne({ token })
        if (isTokenBlacklisted) {
            return res.status(200).json({ user: null })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(decoded.id)

        if (!user) {
            return res.status(200).json({ user: null })
        }

        return res.status(200).json({
            message: 'User details fetched successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })
    } catch (err) {
        return res.status(200).json({ user: null })
    }
}

module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
}
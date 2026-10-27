const express = require('express')
const { sendContactEmailController } = require('../controllers/contact.controller')

const contactRouter = express.Router()

/**
 * @route POST /api/contact
 * @description Send contact form message via Nodemailer (no DB required)
 * @access Public
 */
contactRouter.post('/', sendContactEmailController)

module.exports = contactRouter

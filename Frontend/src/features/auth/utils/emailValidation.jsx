const ALLOWED_DOMAINS = [
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
];

export function validateSupportedEmail(email) {
    if (!email || !email.trim()) {
        return { valid: false, message: 'Please enter your email address.' };
    }

    const normalized = email.trim().toLowerCase();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    const match = normalized.match(emailRegex);

    if (!match) {
        return { valid: false, message: 'Please enter a valid email address.' };
    }

    const [localPart, domain] = normalized.split('@');

    if (localPart.length < 3) {
        return { valid: false, message: 'Please enter a valid email address.' };
    }

    if (!ALLOWED_DOMAINS.includes(domain)) {
        return {
            valid: false,
            message: 'Please use a valid Google (@gmail.com), Yahoo (@yahoo.com), or Outlook (@outlook.com / @hotmail.com) email address.'
        };
    }

    return { valid: true };
}

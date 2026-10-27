# 🚀 InterviewAI-Strategist-Automated-Skill-Gap-Analyzer-Tailored-Roadmaps

**InterviewAI** is an end-to-end full-stack SaaS platform designed to eliminate the guesswork from job interview preparation. By leveraging **Google Gemini AI**, the application analyzes a candidate's resume (or self-profile) alongside any target job description to compute a real-time match score, pinpoint critical skill gaps, curate role-specific technical and behavioral questions (with interviewer intentions and model answers), and construct a day-by-day study roadmap. It also includes an automated ATS-friendly tailored resume generator that renders and downloads as a PDF via headless Chrome.

---

## ✨ Key Features

- **Intuitive Landing & Onboarding**: Clean, high-conversion landing page detailing platform capabilities, metrics, and workflows.
- **Smart Dual-Input Strategy Generator**:
  - Drag-and-drop or file selector for PDF/DOCX resumes with live file metadata and confirmation.
  - In-browser PDF text extraction via memory buffers (`pdf-parse`).
  - Target Job Description input with real-time character counting.
  - Optional quick self-description fallback.
- **AI-Driven Comprehensive Analysis (Google Gemini)**:
  - **Match Score**: 0–100% compatibility rating.
  - **Skill Gaps Detection**: Identifies missing or weak skills categorized by severity (`low`, `medium`, `high`).
  - **Curated Question Bank**: Role-specific technical and behavioral interview questions featuring the interviewer's hidden intent and high-impact model answers (STAR methodology).
  - **Day-by-Day Preparation Roadmap**: Structured daily milestones and actionable preparation tasks.
- **Automated Resume PDF Export**: On-the-fly generation of ATS-friendly tailored resumes converted to downloadable PDFs using headless **Puppeteer**.
- **Secure Authentication with Token Blacklisting**:
  - Restricts account registration/login to authentic **Google** (`@gmail.com`), **Yahoo** (`@yahoo.com`), and **Microsoft Outlook** (`@outlook.com` / `@hotmail.com`) domains with live DNS MX verification.
  - Passwords salted and hashed with **bcryptjs**.
  - Secure HTTP-only JWT cookie authentication.
  - Stateful token blacklisting model in MongoDB to invalidate JWTs upon logout.
- **Direct Contact Messaging**:
  - Contact inquiry form powered by **Nodemailer** forwarding user messages straight to admin email.
- **Modern Responsive UI**:
  - Dark obsidian theme (`#090d16`) with neon pink accents (`#ff2d78`), radial ambient glows, and glassmorphic cards (`backdrop-filter: blur(16px)`).
  - Context-aware sticky navigation bar.

---

## 🛠️ Tech Stack & Architecture

### Frontend
- **Framework**: React 19 (Vite)
- **Routing**: React Router v8 (Protected routes, contextual layout outlets)
- **State Management**: React Context API & Custom Hooks (`useAuth`, `useInterview`)
- **HTTP Client**: Axios (credentials enabled for secure cookies)
- **Styling**: SCSS (Modular architecture, glassmorphism, responsive grid)

### Backend
- **Runtime**: Node.js & Express.js (REST API architecture)
- **Database**: MongoDB Atlas with Mongoose ODM
- **Artificial Intelligence**: Google Gemini API (`@google/genai`) using structured JSON schemas
- **PDF Extraction & Generation**:
  - `multer` (RAM buffer file handling)
  - `pdf-parse` (resume text parsing)
  - `puppeteer` (headless Chromium/Chrome HTML-to-PDF generation)
- **Authentication & Security**:
  - `jsonwebtoken` (JWT)
  - `bcryptjs` (password hashing)
  - `cookie-parser`
  - DNS lookup (`dns.resolveMx`) for email domain verification
- **Email Delivery**: Nodemailer (SMTP transport)

---

## 📂 Project Structure

```text
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js          # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── auth.controller.js     # Auth, validation, blacklist & session checks
│   │   │   ├── contact.controller.js  # Contact inquiry email delivery
│   │   │   └── interview.controller.js# Strategy generation & PDF download
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js     # JWT verification & blacklist validation
│   │   │   └── file.middleware.js     # Multer memory storage configuration
│   │   ├── models/
│   │   │   ├── blacklist.model.js     # Token blacklist schema
│   │   │   ├── interviewReport.model.js# Interview plan schema
│   │   │   └── user.models.js         # User credentials schema
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── contact.routes.js
│   │   │   └── interview.routes.js
│   │   ├── services/
│   │   │   ├── ai.service.js          # Gemini model fallback & Puppeteer PDF generator
│   │   │   └── mail.service.js        # Nodemailer SMTP transporter
│   │   ├── app.js                     # Express app, middleware & route registration
│   │   └── server.js                  # HTTP server listener
│   ├── .env
│   └── package.json
│
└── Frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Layout.jsx             # Shell wrapper with Navbar and Outlet
    │   │   ├── Navbar.jsx             # Dynamic public/workspace navigation
    │   │   └── navbar.scss
    │   ├── features/
    │   │   ├── auth/
    │   │   │   ├── components/protected.jsx
    │   │   │   ├── hooks/useAuth.js
    │   │   │   ├── pages/Login.jsx, Register.jsx
    │   │   │   ├── services/auth.api.js
    │   │   │   ├── utils/emailValidation.jsx
    │   │   │   └── auth.context.jsx, auth.form.scss
    │   │   └── interview/
    │   │       ├── hooks/useInterview.js
    │   │       ├── pages/Home.jsx, interview.jsx
    │   │       ├── services/interview.api.js
    │   │       ├── style/home.scss, interview.scss
    │   │       └── interview.context.jsx
    │   ├── pages/
    │   │   ├── About.jsx
    │   │   ├── Contact.jsx
    │   │   ├── Landing.jsx
    │   │   └── pages.scss
    │   ├── style/
    │   │   └── button.scss
    │   ├── App.jsx
    │   ├── app.routes.jsx             # Client route definitions
    │   ├── main.jsx
    │   └── style.scss                 # Global ambient background & CSS reset
    ├── index.html
    ├── vite.config.js
    └── package.json
```
Environment Variables

Create a .env file in the Backend/ directory with the following variables:

PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GOOGLE_GENAI_API_KEY=your_gemini_api_key
# Nodemailer / Contact Email configuration
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_16_digit_google_app_password
CONTACT_RECEIVER_EMAIL=your_email@gmail.com

🔒 Security Best Practices Implemented
No Plaintext Passwords: Uses bcryptjs with salt rounds for one-way password hashing.
Strict Email Provider Allowlist: Blocks disposable or fake domains; only permits valid Google, Yahoo, and Outlook accounts.
Stateful JWT Logout Invalidation: Logged-out tokens are stored in MongoDB with TTL indexing to prevent replay attacks during the validity window.
Sanitized AI Prompts & Native Type Schemas: Leverages Gemini’s strict JSON output schemas to prevent prompt injection and guarantee valid, parseable structures.

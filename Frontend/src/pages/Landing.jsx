import React from 'react';
import { Link } from 'react-router';
import './pages.scss';

const Landing = ({ onStartClick }) => {
    return (
        <div className="landing-page">
            {/* Hero Introduction Section */}
            <section className="hero">
                <div className="hero__badge">
                    <span className="hero__badge-dot" />
                    AI-Powered Interview Preparation
                </div>

                <h1 className="hero__title">
                    Ace Your Next Tech Interview with{' '}
                    <span className="highlight">Personalized AI Strategy</span>
                </h1>

                <p className="hero__subtitle">
                    Welcome to <strong>InterviewAI</strong>. Upload your resume and paste any target job description—our AI analyzes your skill gaps, predicts tailored technical &amp; behavioral questions, and builds a day-by-day preparation roadmap in seconds.
                </p>

                <div className="hero__cta">
                    {onStartClick ? (
                        <button onClick={onStartClick} className="btn-hero btn-hero--primary">
                            Go to Interview Planner
                        </button>
                    ) : (
                        <>
                            <Link to="/register" className="btn-hero btn-hero--primary">
                                Get Started for Free
                            </Link>
                            <Link to="/login" className="btn-hero btn-hero--secondary">
                                Login to Your Account
                            </Link>
                        </>
                    )}
                </div>

                {/* Stats Row */}
                <div className="hero__stats">
                    <div className="stat-item">
                        <h3>30s</h3>
                        <p>Custom Plan Generation</p>
                    </div>
                    <div className="stat-divider" />
                    <div className="stat-item">
                        <h3>100%</h3>
                        <p>Tailored to Job &amp; Resume</p>
                    </div>
                    <div className="stat-divider" />
                    <div className="stat-item">
                        <h3>3-in-1</h3>
                        <p>Tech, Behavioral &amp; Roadmap</p>
                    </div>
                </div>
            </section>

            {/* Feature Cards Section */}
            <section className="features-section">
                <div className="section-heading">
                    <h2>How <span className="highlight">InterviewAI</span> Works</h2>
                    <p>Everything you need to walk into your next interview with confidence.</p>
                </div>

                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-card__icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="16" y1="13" x2="8" y2="13" />
                                <line x1="16" y1="17" x2="8" y2="17" />
                            </svg>
                        </div>
                        <h3>1. Smart Profile &amp; Job Match</h3>
                        <p>
                            Upload your PDF/DOCX resume or write a quick self-description alongside the target job posting to calculate your real-time match score.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-card__icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="16 18 22 12 16 6" />
                                <polyline points="8 6 2 12 8 18" />
                            </svg>
                        </div>
                        <h3>2. Curated Q&amp;A Bank</h3>
                        <p>
                            Practice role-specific technical and behavioral questions complete with interviewer intentions and high-impact model answers.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-card__icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="3 11 22 2 13 21 11 13 3 11" />
                            </svg>
                        </div>
                        <h3>3. Day-by-Day Study Roadmap</h3>
                        <p>
                            Follow a structured daily preparation schedule designed to close your specific skill gaps before interview day.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Landing;

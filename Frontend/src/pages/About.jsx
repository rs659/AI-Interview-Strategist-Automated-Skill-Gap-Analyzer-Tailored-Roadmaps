import React from 'react';
import { Link } from 'react-router';
import './pages.scss';

const About = () => {
    return (
        <div className="info-page">
            <div className="info-container">
                <span className="page-tag">About Us</span>
                <h1>Empowering Candidates with <span className="highlight">AI-Driven</span> Preparation</h1>
                <p className="lead-text">
                    InterviewAI was built to eliminate the guesswork from job interview preparation. Instead of studying generic question lists, we help you focus on what actually matters for the exact role you are applying for.
                </p>

                <div className="about-grid">
                    <div className="about-card">
                        <h3>Our Mission</h3>
                        <p>
                            To bridge the gap between talented candidates and their dream roles by providing personalized, accessible, and deeply relevant interview coaching powered by modern AI.
                        </p>
                    </div>
                    <div className="about-card">
                        <h3>Why We Built This</h3>
                        <p>
                            Every job description is unique, and every candidate brings a different background. Our platform analyzes both sides to uncover the exact technical topics, behavioral stories, and preparation steps you need.
                        </p>
                    </div>
                </div>

                <div className="cta-banner">
                    <h2>Ready to build your custom interview strategy?</h2>
                    <Link to="/" className="btn-hero btn-hero--primary">
                        Explore InterviewAI
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default About;

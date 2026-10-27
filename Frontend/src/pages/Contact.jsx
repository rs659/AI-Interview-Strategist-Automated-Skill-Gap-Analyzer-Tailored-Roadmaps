import React, { useState } from 'react';
import axios from 'axios';
import './pages.scss';

const Contact = () => {
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const response = await axios.post('http://localhost:3000/api/contact', formData);
            setStatus({
                type: 'success',
                message: response.data?.message || 'Thank you! Your message has been sent successfully.'
            });
            setFormData({ name: '', email: '', message: '' });
        } catch (err) {
            setStatus({
                type: 'error',
                message: err.response?.data?.message || 'Unable to send message right now. Please try again.'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="info-page">
            <div className="info-container">
                <span className="page-tag">Contact Us</span>
                <h1>Get in <span className="highlight">Touch</span></h1>
                <p className="lead-text">
                    Have questions, feedback, or need support with your interview plan? Send us a message and our team will get back to you shortly.
                </p>

                <div className="contact-wrapper">
                    <div className="contact-details">
                        <div className="contact-item">
                            <h4>Email</h4>
                            <p>support@interviewai.com</p>
                        </div>
                        <div className="contact-item">
                            <h4>Location</h4>
                            <p>Remote-First &bull; Global Support</p>
                        </div>
                        <div className="contact-item">
                            <h4>Response Time</h4>
                            <p>Within 24 hours on business days</p>
                        </div>
                    </div>

                    <form className="contact-form" onSubmit={handleSubmit}>
                        {status.message && (
                            <div className={status.type === 'error' ? 'contact-error' : 'contact-success'}>
                                {status.message}
                            </div>
                        )}
                        <div className="form-field">
                            <label htmlFor="name">Your Name</label>
                            <input
                                id="name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Enter your full name"
                            />
                        </div>
                        <div className="form-field">
                            <label htmlFor="contact-email">Email Address</label>
                            <input
                                id="contact-email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="Enter your email address"
                            />
                        </div>
                        <div className="form-field">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                rows="4"
                                required
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                placeholder="How can we help you?"
                            />
                        </div>
                        <button type="submit" disabled={loading} className="btn-hero btn-hero--primary">
                            {loading ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;

import React, { useState, useContext } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router';
import { useAuth } from '../features/auth/hooks/useAuth';
import { InterviewContext } from '../features/interview/interview.context';
import './navbar.scss';

const Navbar = () => {
    const { user, handlelogout } = useAuth();
    const { report } = useContext(InterviewContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    // Check if user is inside the authenticated workspace (Home planner or /interview/:id)
    const isInterviewPage = location.pathname.startsWith('/interview');
    const isWorkspace = isInterviewPage || (location.pathname === '/' && !!user);

    const onLogout = async () => {
        await handlelogout();
        setMenuOpen(false);
        navigate('/login');
    };

    const closeMenu = () => setMenuOpen(false);

    return (
        <header className="navbar">
            <div className="navbar__container">
                {/* Brand Logo */}
                <Link to="/" className="navbar__logo" onClick={closeMenu}>
                    <span className="navbar__logo-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                    </span>
                    <span className="navbar__logo-text">
                        Interview<span className="highlight">AI</span>
                    </span>
                </Link>

                {/* Mobile Hamburger Button */}
                <button
                    className={`navbar__toggle ${menuOpen ? 'open' : ''}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle navigation"
                >
                    <span />
                    <span />
                    <span />
                </button>

                {/* Navigation Menu */}
                <nav className={`navbar__menu ${menuOpen ? 'navbar__menu--open' : ''}`}>
                    {isWorkspace ? (
                        <div className="navbar__workspace-bar">
                            {isInterviewPage ? (
                                <>
                                    <Link to="/" className="workspace-pill workspace-pill--action" onClick={closeMenu}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="19" y1="12" x2="5" y2="12" />
                                            <polyline points="12 19 5 12 12 5" />
                                        </svg>
                                        New Plan
                                    </Link>
                                    {report?.title && (
                                        <div className="workspace-context">
                                            <span className="workspace-context__dot" />
                                            <span className="workspace-context__title">{report.title}</span>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="workspace-context">
                                    <span className="workspace-context__dot" />
                                    <span className="workspace-context__title">AI Strategy Workspace</span>
                                </div>
                            )}
                        </div>
                    ) : (
                        <ul className="navbar__links">
                            <li>
                                <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>
                                    About
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>
                                    Contact
                                </NavLink>
                            </li>
                        </ul>
                    )}

                    {/* Auth Actions */}
                    <div className="navbar__actions">
                        {user ? (
                            <div className="navbar__user">
                                <span className="navbar__username">
                                    Hi, <strong>{user.username || user.email?.split('@')[0] || 'User'}</strong>
                                </span>
                                <button onClick={onLogout} className="btn-nav btn-nav--outline">
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link to="/login" className="btn-nav btn-nav--ghost" onClick={closeMenu}>
                                    Login
                                </Link>
                                <Link to="/register" className="btn-nav btn-nav--primary" onClick={closeMenu}>
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;

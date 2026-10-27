import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import "../auth.form.scss";
import { useAuth } from '../hooks/useAuth';
import { validateSupportedEmail } from '../utils/emailValidation.jsx';

const Login = () => {
    const { loading, handleLogin } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const check = validateSupportedEmail(email);
        if (!check.valid) {
            setError(check.message);
            return;
        }

        const result = await handleLogin({ email: email.trim().toLowerCase(), password });
        if (result?.success) {
            navigate('/');
        } else {
            setError(result?.message || "Invalid email or password");
        }
    };

    if (loading) {
        return (<main><h1>Loading.......</h1></main>);
    }

    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>

                {error && <div className="auth-alert auth-alert--error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setError("");
                            }}
                            type="email"
                            id="email"
                            name="email"
                            required
                            placeholder="Enter email address"
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError("");
                            }}
                            type="password"
                            id="password"
                            name="password"
                            required
                            placeholder="Enter password"
                        />
                    </div>

                    <button className="button primary-button">Login</button>
                </form>

                <p>Don't have an account? <Link to={"/register"}>Register</Link></p>
            </div>
        </main>
    );
};

export default Login;
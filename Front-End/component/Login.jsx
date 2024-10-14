import React, { useState } from 'react';
import { loginUser } from '../services/api'; // Adjust the import path as necessary
import Captcha from '../component/Captcha';
import './login.css';

const Login = ({ onLoginSuccess }) => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [isCaptchaSolved, setIsCaptchaSolved] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isCaptchaSolved) {
            setError('Please solve the CAPTCHA correctly');
            return;
        }
        try {
            await loginUser(credentials);
            onLoginSuccess();
        } catch (err) {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="username@gmail.com"
                        value={credentials.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <Captcha onCaptchaSolved={setIsCaptchaSolved} />
                {error && <div className="error">{error}</div>}
                <button type="submit" className="btn" disabled={!isCaptchaSolved}>Login</button>
            </form>
        </div>
    );
};

export default Login;

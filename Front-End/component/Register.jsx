import React, { useState } from 'react';
import { registerUser } from '../services/api'; // Adjust the import path as necessary
import './register.css';
import Captcha from './Captcha';

const Register = ({ onRegisterSuccess }) => {
    const [credentials, setCredentials] = useState({ Username: '', Password: '', Roles: [] });
    const [error, setError] = useState('');
    const [isCaptchaSolved, setIsCaptchaSolved] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'Roles') {
            setCredentials({ ...credentials, Roles: [value] });
        } else {
            setCredentials({ ...credentials, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isCaptchaSolved) {
            setError('Please solve the CAPTCHA correctly');
            return;
        }
        try {
            await registerUser(credentials);
            onRegisterSuccess();
        } catch (err) {
            setError('Registration failed');
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        placeholder='username@gmail.com'
                        name="Username"
                        value={credentials.Username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder='password'
                        name="Password"
                        value={credentials.Password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Role</label>
                    <select
                        name="Roles"
                        value={credentials.Roles[0] || ''}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Role</option>
                        <option value="Reader">Reader</option>
                        <option value="Writer">Writer</option>
                    </select>
                </div>
                <Captcha onCaptchaSolved={setIsCaptchaSolved} />
                {error && <div className="error">{error}</div>}
                <button type="submit" className="btn" disabled={!isCaptchaSolved}>Register</button>
            </form>
        </div>
    );
};

export default Register;

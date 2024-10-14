import React, { useState, useEffect } from 'react';
import './captcha.css';

const Captcha = ({ onCaptchaSolved }) => {
    const [captcha, setCaptcha] = useState('');
    const [userInput, setUserInput] = useState('');
    const [isCaptchaValid, setIsCaptchaValid] = useState(false);

    useEffect(() => {
        generateCaptcha();
    }, []);

    const generateCaptcha = () => {
        const num1 = Math.floor(Math.random() * 10);
        const num2 = Math.floor(Math.random() * 10);
        setCaptcha(`${num1} + ${num2}`);
        setUserInput('');
        setIsCaptchaValid(false);
    };

    const handleChange = (e) => {
        setUserInput(e.target.value);
        const [num1, num2] = captcha.split(' + ').map(Number);
        if (parseInt(e.target.value, 10) === num1 + num2) {
            setIsCaptchaValid(true);
            onCaptchaSolved(true);
        } else {
            setIsCaptchaValid(false);
            onCaptchaSolved(false);
        }
    };

    return (
        <div className="captcha-container">
            <div className="captcha">
                <span style={{ textDecoration: 'line-through' }}>{captcha}</span>
                <button className="regen-button" onClick={generateCaptcha}>Regenerate</button>
            </div>
            <div className="captcha-input">
                <input
                    type="text"
                    value={userInput}
                    onChange={handleChange}
                    placeholder="Enter sum"
                    required
                />
            </div>
            {!isCaptchaValid && <div className="error">Incorrect Captcha, try again</div>}
            {isCaptchaValid && <div className="success">Proceed</div>}
        </div>
    );
};

export default Captcha;

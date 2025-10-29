import React from 'react';

const LoginForm = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState(null);

    const handleLogin = () => {
        if (email.trim() === '') {
            setError('Email required');
        } else if (password.trim().length < 8) {
            setError('Password too short. Please use 8 or more characters.');
        } else {
            // Send login request to backend
        }
    };

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
        setError(null);
    };

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
        setError(null);
    };

    return (
        <div>
            <h2>Login</h2>
            <form>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={handleChangeEmail} />
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={handleChangePassword} />
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
                <button type="button" onClick={handleLogin}>Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
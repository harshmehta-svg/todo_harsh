import React, { useState } from 'react';
import './UserForm.css';

function UserForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleAddUser = (event) => {
        event.preventDefault();
        // Add logic to create a new user here
        console.log('username:', username, 'email:', email, 'phone:', phoneNumber);
    };

    return (
        <div className="user-form-container">
            <h2>Add User</h2>
            <form onSubmit={handleAddUser}>
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </label>

                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </label>

                <label>
                    Phone Number:
                    <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(event) => setPhoneNumber(event.target.value)}
                    />
                </label>

                <button type="submit">Add User</button>
            </form>
        </div>
    );
}

export default UserForm;
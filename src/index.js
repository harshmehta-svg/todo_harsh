// New file: src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios';
import ProfileForm from './ProfileForm';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

function AppWrapper() {
  return (
    <div>
      <App />
      <ProfileForm />
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
  document.getElementById('root')
);

// API Call from ProfileForm.js
function ProfileForm() {
  const [user, setUser] = React.useState({});
  React.useEffect(() => {
    axios.get('/api/me').then(res => setUser(res.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userUpdate = { ...user, id: user.id, name: e.target.name.value, email: e.target.email.value };
    axios.put('/api/me', userUpdate)
      .then(() => console.log('User updated'))
      .catch((err) => console.error(err));
  };

  const handleInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input type="text" name="name" value={user.name} onChange={handleInputChange} />
      <br />
      <label>Email:</label>
      <input type="email" name="email" value={user.email} onChange={handleInputChange} />
      <br />
      <input type="submit" value="Save" />
    </form>
  );
};

export default App;
export { ProfileForm };
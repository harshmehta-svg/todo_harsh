// @flow

import React, { useState } from 'react';
import "./App.css";
import "./NotificationBell.css"; // Added import for NotificationBell component CSS

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0); // Added state for unread notifications count
  const [latestNotifications, setLatestNotifications] = useState([]); // Added state for latest notifications

  const notificationsData = [ // Sample data for latest notifications
    { id: 1, message: 'New task added', time: '10 minutes ago' },
    { id: 2, message: 'Task completed', time: '30 minutes ago' },
    { id: 3, message: 'New message received', time: '1 hour ago' }
  ]; // Sample data for unread notifications count
  const unreadNotifications = 3;

  const handleLogin = (event: SyntheticEvent) => {
    event.preventDefault();
    if (username === 'admin' && password === 'password') {
      setIsLoggedIn(true);
      setLoginStatus(true);
      setUnreadNotificationsCount(unreadNotifications); // Update unread notifications count on login
      setLatestNotifications(notificationsData); // Update latest notifications on login
    } else {
      alert('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginStatus(false);
    setUnreadNotificationsCount(0); // Reset unread notifications count on logout
    setLatestNotifications([]); // Reset latest notifications on logout
  };

  const toggleNotificationBell = () => {
    document.getElementById("notification-bell").classList.toggle("show");
  }

  const markAllAsRead = () => {
    setUnreadNotificationsCount(0); // Reset unread notifications count
    setLatestNotifications([]); // Reset latest notifications
  }

  return (
    <div className="App">
      <header className="App-header">
        {isLoggedIn === true ? (
          <div>
            <h2>
              Welcome, {username}! <button onClick={handleLogout}>Logout</button>
            </h2>
            <NotificationBell unreadNotificationsCount={unreadNotificationsCount} toggleNotificationBell={toggleNotificationBell} markAllAsRead={markAllAsRead} />
          </div>
        ) : (
          loginStatus === false && (
            <form onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <button type="submit">Login</button>
            </form>
          )
        )}
      </header>
      <div id="notification-bell" className="notification-bell">
        <ul>
          {latestNotifications.map((notification, index) => (
            <li key={index} className="notification">
              <span>{notification.message}</span>
              <span>{notification.time}</span>
            </li>
          ))}
        </ul>
        <span className="unread-count">{unreadNotificationsCount}</span>
        <button className="mark-all-as-read" onClick={markAllAsRead}>Mark All As Read</button>
        <button className="close-notification-bell" onClick={toggleNotificationBell}>Close</button>
      </div>
    </div>
  );
}

export default App;

// Added NotificationBell component
function NotificationBell(props) {
  const { unreadNotificationsCount, toggleNotificationBell, markAllAsRead } = props;
  return (
    <div className="notification-bell-icon" onClick={toggleNotificationBell}>
      <i className="fas fa-bell"> {unreadNotificationsCount > 0 && <span className="unread-badge">{unreadNotificationsCount}</span>} </i>
    </div>
  );
}

// Added NotificationBell CSS
.notification-bell {
  position: absolute;
  top: 50px;
  right: 50px;
  background-color: white;
  padding: 10px;
  display: none;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.notification-bell.show {
  display: block;
}

.notification {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.notification span {
  font-size: 14px;
  line-height: 20px;
}

.unread-count {
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: red;
  padding: 2px 6px;
  border-radius: 50%;
  color: white;
}

.mark-all-as-read {
  margin-left: 10px;
}
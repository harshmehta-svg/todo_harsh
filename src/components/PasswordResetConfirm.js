// Importing required dependencies
import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Typography,
  Box,
  Container,
  TextField,
  Link,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import { UserContext } from '../UserContext';
import Cookies from 'js-cookie';

// PasswordResetConfirm Component
function PasswordResetConfirm() {
  // Context and hooks
  const { setLogged, token, setToken } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = React.useState(false);

  // States for form fields and password reset status
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [passwordResetStatus, setPasswordResetStatus] = React.useState(null);

  // Handles form submission (password reset submission)
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password === confirmPassword) {
      try {
        // Call password reset API with new password
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/users/reset-password`,
          { token, newPassword: password },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        // Reset password and log in user
        setLogged(true);
        Cookies.remove('jwt');
        Cookies.set('jwt', response.data.token, { expires: 7 });
        setToken(response.data.token);
        navigate('/');
        // Update password reset status
        setPasswordResetStatus(true);
        setOpen(true);
      } catch (error) {
        // Display error message
        setPasswordResetStatus(false);
        setOpen(true);
      }
    } else {
      // Display error message if passwords do not match
      setPasswordResetStatus(false);
      setOpen(true);
    }
  };

  // Render component
  return (
    <div>
      {passwordResetStatus === true && (
        <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
          <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%' }}>
            Password has been reset successfully! You can now log in.
          </Alert>
        </Snackbar>
      )}
      {passwordResetStatus === false && (
        <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
          <Alert onClose={() => setOpen(false)} severity="error" sx={{ width: '100%' }}>
            Error resetting password. Please try again.
          </Alert>
        </Snackbar>
      )}
      <Container maxWidth="sm">
        <Box sx={{ display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent: 'center', minHeight: '100vh' }}>
          <Typography variant="h3" component="h2" gutterBottom>
            Reset Your Password
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="New Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>
            <Box sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm New Password"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Box>
            <Box sx={{ mt: 1 }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Reset Password
              </Button>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </form>
          <Box sx={{ mt: 2 }}>
            <Button
              href="/login"
              variant="contained"
              sx={{ mt: 1 }}
            >
              Back to login
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default PasswordResetConfirm;
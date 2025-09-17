// Services to handle authentication
import { LocalStorageService } from './localStorageService';
import { ApiClient } from './apiClient';

const localStorageService = new LocalStorageService();
const apiClient = new ApiClient();

// Function to validate user credentials
function validateUserCredentials(username, password) {
  // Make API request to authenticate user credentials
  const response = apiClient.post('/login', { username, password });
  return response;
}

// Class to handle user authentication
class AuthService {
  constructor() {
    this.user = localStorageService.getItem('user');
  }

  login(username, password) {
    const response = validateUserCredentials(username, password);
    if (response.status === 200) {
      const userData = response.data;
      localStorageService.setItem('user', userData);
      this.user = userData;
      return true;
    }
    return false;
  }

  logout() {
    localStorageService.removeItem('user');
    this.user = null;
  }

  isUserAuthenticated() {
    const userData = localStorageService.getItem('user');
    return userData !== null;
  }
}

const authService = new AuthService();

export { authService, validateUserCredentials };
import { authInstance } from './index.service';

const PREFIX = 'auth';

class AuthService {
  async login(email: string, password: string) {
    try {
      const response = await authInstance.post(`${PREFIX}/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.error('Error during login', error);
      throw new Error('Failed to login');
    }
  }

  async signup(email: string, password: string) {
    try {
      const response = await authInstance.post(`${PREFIX}/signup`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.error('Error during signup', error);
      throw new Error('Failed to signup');
    }
  }
}

export const authService = new AuthService();

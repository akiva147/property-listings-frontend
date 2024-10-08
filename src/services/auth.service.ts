import axios from 'axios';
import { authInstance } from './index.service';
import { validateEnvs } from '../utils/env.utils';

const PREFIX = 'auth';
const { REACT_APP_SERVER_URL } = validateEnvs();

class AuthService {
  async login(email: string, password: string): Promise<{ token: string }> {
    try {
      const response = await axios.post(
        `${REACT_APP_SERVER_URL}/${PREFIX}/login`,
        {
          email,
          password,
        },
      );
      return response.data;
    } catch (error) {
      console.error('Error during login', error);
      throw new Error('Failed to login');
    }
  }

  async signup(email: string, password: string) {
    try {
      await axios.post(`${REACT_APP_SERVER_URL}/${PREFIX}/signup`, {
        email,
        password,
      });
    } catch (error) {
      console.error('Error during signup', error);
      throw new Error('Failed to signup');
    }
  }
  async refreshToken(): Promise<{ token: string }> {
    try {
      const response = await authInstance.get(`${PREFIX}/refresh-token`);
      return response.data;
    } catch (error) {
      console.error('Error during refresh token', error);
      throw new Error('Failed to refresh token');
    }
  }
}

export const authService = new AuthService();

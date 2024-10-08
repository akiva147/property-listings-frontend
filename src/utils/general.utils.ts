import { jwtDecode } from 'jwt-decode';

export const isTokenExpired = () => {
  const token = localStorage.getItem('token');

  if (!token) return { isExpired: false, isUndefined: true };
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (!decodedToken.exp) throw new Error('Invalid token');
    return { isExpired: decodedToken.exp < currentTime, isUndefined: false };
  } catch (error) {
    console.error('Error decoding token:', error);
    return { isExpired: false, isUndefined: true };
  }
};

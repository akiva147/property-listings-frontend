import { jwtDecode } from 'jwt-decode';

export const isTokenExpired = (token: string | null) => {
  if (!token) return true;
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (!decodedToken.exp) throw new Error('Invalid token');
    return decodedToken.exp < currentTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};

export const pathameToTitle = (pathname: string) => {
  if (pathname === '/') return 'Home'; // Title for the root path

  // Split the path by '/' and filter out empty parts
  const pathParts = pathname.split('/').filter((part) => part !== '');

  // Capitalize the first letter of each part and replace hyphens with spaces
  const formattedTitle = pathParts
    .map(
      (part) =>
        part
          .replace(/-/g, ' ') // Replace hyphens with spaces
          .charAt(0)
          .toUpperCase() + part.slice(1), // Capitalize the first letter
    )
    .join(' ');

  return formattedTitle;
};

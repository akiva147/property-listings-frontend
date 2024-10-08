import axios, { AxiosHeaders } from 'axios';
import { validateEnvs } from '../utils/env.utils';
import { isTokenExpired } from '../utils/general.utils';
import { authService } from './auth.service';

const { REACT_APP_SERVER_URL } = validateEnvs();

export const authInstance = axios.create({
  baseURL: REACT_APP_SERVER_URL,
});

/**
 * Async function for making API Request
 * @returns Instance Of Axios Object With Auth Header on it
 */
authInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('token');
  if (!accessToken) throw new Error('token is undefined');

  // If headers are not AxiosHeaders, create an instance
  if (!(config.headers instanceof AxiosHeaders)) {
    config.headers = new AxiosHeaders(config.headers || {});
  }

  // Set the Authorization header
  config.headers.set('Authorization', `Bearer ${accessToken}`);

  return config;
});

authInstance.interceptors.response.use(
  (response) => {
    const { isExpired, isAboutToExpire } = isTokenExpired();
    if (!isExpired && isAboutToExpire)
      return Promise.reject('Token is about to expire');
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      const resp = await authService.refreshToken();

      const access_token = resp.token;

      localStorage.setItem('token', access_token);
      authInstance.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${access_token}`;
      return authInstance(originalRequest);
    }
    return Promise.reject(error);
  },
);

// authInstance.interceptors.response.use(
//   async (response) => {
//     const { isExpired, isAboutToExpire, isUndefined } = isTokenExpired();
//     const refreshToken = localStorage.getItem('refreshToken');

//     if (!isUndefined && !isExpired && isAboutToExpire) {
//       try {
//         if (!refreshToken) throw new Error('No refresh token found');
//         const newToken = await authService.refreshToken(refreshToken);
//         console.log(
//           'authInstance.interceptors.response.use  refreshToken:',
//           newToken,
//         );

//         localStorage.setItem('token', newToken.token);
//         // localStorage.removeItem('');
//         // Update the Authorization header in the authInstance with the new token
//         authInstance.defaults.headers[
//           'Authorization'
//         ] = `Bearer ${newToken.token}`;
//       } catch (error) {
//         console.error('Token refresh failed:', error);
//         throw error;
//       }
//     }

//     return response; // Return the original response if no refresh is needed or after refresh
//   },
//   (error) => {
//     return Promise.reject(error); // Handle errors as usual
//   },
// );

// authInstance.interceptors.response.use(async (value) => {
//   const { isAboutToExpire, isExpired } = isTokenExpired();
//   console.log(
//     'authInstance.interceptors.response.use  isAboutToExpire:',
//     isAboutToExpire,
//   );

//   if (!isExpired && isAboutToExpire) {
//     const refreshToken = await authService.refreshToken();
//     console.log(
//       'authInstance.interceptors.response.use  refreshToken:',
//       refreshToken,
//     );
//     localStorage.setItem('token', refreshToken.token);
//   }
//   return value;
// });

// authInstance.interceptors.response.use((response)=> {
//   return response;},
//   function (error) {
//   const originalRequest = error.config;
//   if (error.response.status === 401 && originalRequest.url === `${API}refresh`)
// {
//   //clear Auth Creditneiats in local storage and then return
//   return Promise. reject(error);}}
//   // The above code is just to make sure we dont go on an infinite loop and r
//   // eject if the refreshToken is invalid or expired.
//   if (error.response.status === 401 && !originalRequest._retry) {
//     originalRequest._retry = true;
//     const refreshToken = authServi
//     const user = localStorageService.getUser();
//     return axios
//     email: user.emait,
//     ref reshToken: refreshToken
//     201) {
//     if (res.status
//     localStorageService. setToken( res. data. accessToken) ;
//     axios. defaults. headers . comon( "Authorization" J
//     "Bearer " + local StorageService. getAccessToken();
//     return axios(originalRequest) ;
//   }
//   return Promise. reject (error)} );

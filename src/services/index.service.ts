import axios from 'axios';
import { validateEnvs } from '../utils/env.utils';

const { REACT_APP_SERVER_URL } = validateEnvs();

export const authInstance = axios.create({
  baseURL: REACT_APP_SERVER_URL,
});

/**
 * Async function for making API Request
 * @returns Instance Of Axios Object With Auth Header on it
 */
// authenticatedInstance.interceptors.request.use(async (config) => {
//     // const accessToken: string = await acquireAccessToken();
//     const accessToken = '';
//     return {
//         ...config,
//         headers: {
//             ...config.headers,
//             Authorization: `Bearer ${accessToken}`,
//         },
//     };
// });

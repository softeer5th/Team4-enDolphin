const ACCESS_TOKEN_KEY = 'accessToken';

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);
export const isLogin = () => localStorage.getItem(ACCESS_TOKEN_KEY) !== null;
const ACCESS_TOKEN_NAME = 'accessToken';

export const setAccessToken = (token: string) => {
  localStorage.setItem(ACCESS_TOKEN_NAME, token);
};

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_NAME);

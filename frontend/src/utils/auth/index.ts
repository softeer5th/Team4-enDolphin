import type { JWTResponse } from '@/features/login/model';

const ACCESS_TOKEN_KEY = 'accessToken';

export const setLogin = ({ accessToken, expiredAt }: JWTResponse)=> {
  localStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify({
    accessToken, expiredAt,
  }));
};

export const getAccessToken = () => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (!token) return null;

  const { accessToken, expiredAt } = JSON.parse(token);
  if (new Date(expiredAt) > new Date()) {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    return null;
  }
    
  return accessToken;
};

export const isLogin = () => {
  const accessToken = getAccessToken();
  if (!accessToken) return false;
  return true;
};

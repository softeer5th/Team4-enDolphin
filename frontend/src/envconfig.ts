export const defaultENV = Object.freeze({
  MODE: import.meta.env.MODE,
});

export const serviceENV = Object.freeze({
  BASE_URL: import.meta.env.VITE_API_URL,
  GOOGLE_OAUTH_URL: import.meta.env.VITE_GOOGLE_OAUTH_URL,
});
export const cookies = (cookieHeader = '') => {    
  const cookieStore = cookieHeader.split('; ').reduce((acc, cookie) => {
    const [key, value] = cookie.split('=');
    acc[key] = decodeURIComponent(value);
    return acc;
  }, {});
  
  const get = (key) => cookieStore[key];

  return { get };
};
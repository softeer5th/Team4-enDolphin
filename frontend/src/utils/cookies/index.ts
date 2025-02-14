export const cookies = (cookieHeader: string | undefined) => {
  if (!cookieHeader) return {};
  
  const cookieStore = cookieHeader.split('; ').reduce((acc, cookie) => {
    const [key, value] = cookie.split('=');
    acc[key] = decodeURIComponent(value);
    return acc;
  }, {} as Record<string, string>);

  const get = (key: string): string | undefined => cookieStore[key];
  return { get };
};
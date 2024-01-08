const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

export const isTokenExpired = (token: string) => {
  const parsedToken = parseJwt(token);

  if (!parsedToken) {
    return false;
  }

  const exp = new Date(parsedToken.exp * 1000);
  return exp < new Date();
};

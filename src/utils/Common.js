// return the user data from the session storage
export const getUser = () => {
  const userStr = sessionStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);
  return null;
}

// return the token from the session storage
export const getToken = () => {
  return sessionStorage.getItem('token') || null;
}

// remove the token and user from the session storage
export const removeUserSession = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
}

// set the token and user from the session storage
export const setUserSession = (token, user) => {
  sessionStorage.setItem('token', token);
  sessionStorage.setItem('user', JSON.stringify(user));
}

// return the request headers for calling post / put operation
export const getHeaders = () => {
  return {
    "Content-Type": "application/json",
    "X-Parse-Application-Id": "UKB9QAriw4ABOGRwOJ67fXj2Iypx7UQPhj5ZdR66",
    "X-Parse-Rest-Api-Key": "FQ3wONUU2tFb7o8I7nszpAlQkMoxMS6FEbcpXkRz"
  }
}

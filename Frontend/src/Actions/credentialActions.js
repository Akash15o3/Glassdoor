export const login = (role) => {
  return {
    type: 'LOGIN',
    role,
  };
};

export const logout = () => {
  return {
    type: 'LOGOUT',
  };
};
export const viewWhileNotLoggedIn = () => {
  return {
    type: 'NOT_LOGGED_IN_VIEW',
  };
};

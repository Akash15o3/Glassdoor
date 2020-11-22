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

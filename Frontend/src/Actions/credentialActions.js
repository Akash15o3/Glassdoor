export const login = (user, id, role) => {
  return {
    type: 'LOGIN',
    user,
    id,
    role,
  };
};
export const signUp = (user, id, role) => {
  return {
    type: 'SIGN_UP',
    user,
    id,
    role
  };
};
export const logout = () => {
  return {
    type: 'LOGOUT',
  };
};

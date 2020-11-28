export const setAdmin = (user, id) => {
  return {
    type: 'SETADMIN',
    user,
    id,
  };
};
export const setEmployer = (user, id) => {
  return {
    type: 'SETEMPLOYER',
    user,
    id,
  };
};

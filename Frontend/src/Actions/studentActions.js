export const setStudent = (user, id) => {
  return {
    type: 'SETSTUDENT',
    user,
    id,
  };
};

export const search = (searchQuery) => {
  return {
    type: 'SEARCH',
    searchQuery,
  };
};

export const updateProfile = (updateInfo) => {
  return {
    type: 'UPDATE_PROFILE',
    updateInfo
  };
};

export const getCNameAndClocation = (cname, clocation) => {
  return {
    type: 'CNAME_CLOCATION',
    cname,
    clocation,
  };
};

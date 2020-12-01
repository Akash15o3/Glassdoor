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

export const getCid = (cid,) => {
  return {
    type: 'CID',
    cid,
  };
};

export const getCName = (cname) => {
  return {
    type: 'CNAME',
    cname,
  };
};

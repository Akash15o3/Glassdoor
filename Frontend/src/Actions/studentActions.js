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

export const updateStudent = (updateInfo) => {
  return {
    type: 'UPDATE_STUDENT',
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

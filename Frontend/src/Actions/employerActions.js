export const setEmployer = (user, id) => {
  return {
    type: "SETEMPLOYER",
    user,
    id,
  };
};

export const updateProfileEm = (updateInfo) => {
  return {
    type: "UPDATE_PROFILE_EM",
    updateInfo,
  };
};

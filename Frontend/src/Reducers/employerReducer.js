const initialState = {};

const employerReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case "SETEMPLOYER":
      return {
        user: action.user,
        id: action.id,
      };
    case "UPDATE_PROFILE_EM":
      return {
        ...state,
        user: {
          ...state.user,
          ...action.updateInfo,
        },
      };
    case "LOGOUT":
      return {};
    default:
      return state;
  }
};

export default employerReducer;

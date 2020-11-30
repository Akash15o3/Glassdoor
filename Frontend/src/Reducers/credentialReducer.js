const initialState = {
  isAuth: false,
  role: 'anonymous',
  views: 0
};

const credentialReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case 'LOGIN':
      return {
        isAuth: true,
        role: action.role.toLowerCase(),
      };
    case 'LOGOUT':
      return {
        isAuth: false,
        role: 'anonymous',
        views: 0
      };
    case 'NOT_LOGGED_IN_VIEW':
      return {
        ...state,
        views: state.views + 1
      };
    default:
      return state;
  }
};

export default credentialReducer;

const initialState = {
  isAuth: false
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
      };
    default:
      return state;
  }
};

export default credentialReducer;

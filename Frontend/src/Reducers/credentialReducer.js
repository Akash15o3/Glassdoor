const initialState = {
    isAuth:false
};

const credentialReducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
      case 'LOGIN':
      case 'SIGN_UP':
        return {
          user: action.user,
          isAuth: true,
          id: action.id,
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
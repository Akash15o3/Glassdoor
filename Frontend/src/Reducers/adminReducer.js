const initialState = { };

const adminReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case 'SETADMIN':
      return {
        user: action.user,
        id: action.id
      };
    case 'LOGOUT':
      return {
      };
    default:
      return state;
  }
};

export default adminReducer;
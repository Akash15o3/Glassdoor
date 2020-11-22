const initialState = { };

const employerReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case 'SETEMPLOYER':
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

export default employerReducer;

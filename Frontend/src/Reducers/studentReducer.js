const initialState = { };

const studentReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case 'SETSTUDENT':
      return {
        user: action.user,
        id: action.id
      };
    case 'SEARCH':
      return {
        ...state,
        searchQuery: action.searchQuery,
      };
    case 'UPDATE_PROFILE':
      return {
        ...state,
        user: {
          ...state.user,
          ...action.updateInfo
        }
      };
    case 'CID':
      return {
        ...state,
        cid: action.cid,
      };
    case 'LOGOUT':
      return {
      };
    default:
      return state;
  }
};

export default studentReducer;

const initialState = {
};

const studentReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case 'SEARCH':
      return {
        searchQuery: action.searchQuery,
      };
    default:
      return state;
  }
};

export default studentReducer;

const initialState = { userToken: undefined };

function setUserToken(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case "SET_USER_TOKEN":
      nextState = {
        ...state,
        userToken: action.value,
      };
      return nextState || state;
    default:
      return state;
  }
}

export default setUserToken;

const initialState = { userToken: null, isLoading: true, isSignOut: false };

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGGING_IN":
      return {
        ...state,
        isLoading: true,
      };
    case "RESTORE_TOKEN":
      return {
        ...state,
        userToken: action.token,
        isLoading: false,
        isSignOut: false,
      };
    case "SIGN_IN":
      return {
        ...state,
        isSignOut: false,
        userToken: action.token,
        isLoading: false,
      };
    case "SIGN_OUT":
      return {
        ...state,
        isSignOut: true,
        userToken: null,
        isLoading: false,
      };
    default:
      return state;
  }
}

export default loginReducer;

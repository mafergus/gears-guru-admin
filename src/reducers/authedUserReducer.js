const INITAL_STATE = null;

export function authedUserReducer(state = INITAL_STATE, action) {
  switch (action.type) {
    case "ADD_AUTHED_USER_SUCCESS": return action.user;
    case "SIGN_OUT_USER": return INITAL_STATE;
    default:
      return state;
  }
}

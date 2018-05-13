export function customersReducer(state = {}, action) {
  switch (action.type) {
    case "ADD_CUSTOMER":
      let newState = { ...state };
      newState[action.id] = { uid: action.id, ...action.customer };
      return newState;
    default:
      return state;
  }
}

export function garageReducer(state = {}, action) {
  switch (action.type) {
    case "ADD_GARAGE_SUCCESS": return action.garage;
    default:
      return state;
  }
}

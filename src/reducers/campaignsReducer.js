export function campaignsReducer(state = [], action) {
  switch (action.type) {
    case "ADD_CAMPAIGN":
      let newState = { ...state };
      newState[action.id] = { uid: action.id, ...action.campaign };
      return newState;
    default:
      return state;
  }
}

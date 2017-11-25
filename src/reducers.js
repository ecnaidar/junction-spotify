import { combineReducers } from "redux";

function code(state = null, action) {
  switch (action.type) {
    case "AUTHORIZATION_CODE":
      return action.payload;
    default:
      return state;
  }
}

function token(state = {}, action) {
  switch (action.type) {
    case "ACCESS_TOKEN":
      return { ...action.payload };
    default:
      return state;
  }
}

export default combineReducers({
  code,
  token
});

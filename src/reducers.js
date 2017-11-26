import { combineReducers } from "redux";

function code(state = null, action) {
  switch (action.type) {
    case "AUTHORIZATION_CODE":
      return action.payload;
    default:
      return state;
  }
}

function token(state = null, action) {
  switch (action.type) {
    case "ACCESS_TOKEN":
      return { ...action.payload };
    default:
      return state;
  }
}

function user(state = null, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...action.payload };
    default:
      return state;
  }
}

function playlists(state = null, action) {
  switch (action.type) {
    case "SET_PLAYLISTS":
      return { ...action.payload };
    default:
      return state;
  }
}

function spots(state = null, action) {
  switch (action.type) {
    case "SET_SPOTS":
      return [ ...action.payload ];
    default:
      return state;
  }
}

export default combineReducers({
  user,
  spots,
  code,
  token,
  playlists
});

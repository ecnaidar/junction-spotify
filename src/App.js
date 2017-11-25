// @flow
import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import { createStore } from "redux";
import { Provider } from "react-redux";

import qs from "query-string";

import Map from "./Map";
import LoginScreen from "./LoginScreen";
import SharePlaylistScreen from "./SharePlaylistScreen";

import rootReducer from "./reducers";

const Navigator = StackNavigator({
  Home: {
    screen: Map
  },
  Login: {
    screen: LoginScreen
  },
  SharePlaylist: {
    screen: SharePlaylistScreen
  }
});

export default props => {
  const store = createStore(rootReducer);
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
};

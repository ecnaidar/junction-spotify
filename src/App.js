// @flow
import React from "react";
import { StackNavigator } from "react-navigation";
import {
  Header,
  Body,
  Title,
  Right,
  Text,
  Container,
  Content
} from "native-base";
import Map from "./Map";

const NavigatorHeader = props => {
  return (
    <Header>
      <Body>
        <Title>Junctioin Spotify</Title>
      </Body>
      <Right />
    </Header>
  );
};

const defaultNavigationOptions = {
  navigationOptions: ({ navigation }) => ({
    header: NavigatorHeader
  })
};

export default StackNavigator(
  {
    Home: {
      screen: Map
    }
  },
  defaultNavigationOptions
);

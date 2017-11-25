// @flow
import React from "react";
import { WebView } from "react-native";
import { StackNavigator } from "react-navigation";
import {
  Header,
  Body,
  Title,
  Right,
  Text,
  Button,
  Container,
  Content
} from "native-base";
import Map from "./Map";

const NavigatorHeader = props => {
  const { navigation } = props;
  return (
    <Header>
      <Body>
        <Title>Junctioin Spotify</Title>
      </Body>
      <Right>
        <Button transparent onPress={() => navigation.navigate("Login")}>
          <Text>Login</Text>
        </Button>
      </Right>
    </Header>
  );
};

const defaultNavigationOptions = {
  navigationOptions: ({ navigation }) => ({
    header: NavigatorHeader
  })
};

const Login = () => (
  <WebView
    source={{ uri: "https://spotify.com/api/v1/authorize" }}
    // source={{ uri: "https://google.com/" }}
  />
);

export default StackNavigator(
  {
    Home: {
      screen: Map
    },
    Login: {
      screen: Login
    }
  },
  defaultNavigationOptions
);

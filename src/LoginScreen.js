import React, { Component } from "react";
import { WebView } from "react-native";

import { connect } from "react-redux";
import qs from "query-string";
import axios from "axios";

import { clientId, clientSecret } from "../secret.json";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gotCredentials: false
    };
  }

  userScope = ["user-read-private", "playlist-read-private"];

  redirectUri = "http://spotify.junction.example/";

  uri = "https://accounts.spotify.com/authorize" +
    "?response_type=code" +
    "&client_id=" +
    clientId +
    "&scope=" +
    encodeURIComponent(this.userScope.join(" ")) +
    "&redirect_uri=" +
    encodeURIComponent(this.redirectUri);

  onNavigationStateChange = ({
    canGoBack,
    canGoForward,
    loading,
    target,
    title,
    url
  }) => {
    const { gotCredentials } = this.state;
    const { gotCode, gotToken, navigation } = this.props;
    if (
      url &&
      !gotCredentials &&
      url.includes("http://spotify.junction.example/")
    ) {
      this.setState({ gotCredentials: true });
      const { code } = qs.parse(qs.extract(url));

      gotCode(code);
      navigation.goBack();
      axios
        .post(
          "https://accounts.spotify.com/api/token",
          qs.stringify({
            code: code,
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: "authorization_code",
            redirect_uri: this.redirectUri
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        )
        .then(
          res => {
            gotToken(res.data);
            console.log(res);
          },
          err => {
            console.log(err);
          }
        );
    }
  };

  render() {
    return (
      <WebView
        source={{
          uri: this.uri
        }}
        onNavigationStateChange={this.onNavigationStateChange}
        onError={(...args) => {
          console.log(args);
        }}
      />
    );
  }
}

export default connect(
  state => {
    return {};
  },
  dispatch => {
    return {
      gotCode: code => {
        dispatch({
          type: "AUTHORIZATION_CODE",
          payload: code
        });
      },
      gotToken: token => {
        dispatch({
          type: "ACCESS_TOKEN",
          payload: token
        });
      }
    };
  }
)(Login);

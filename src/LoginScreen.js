import React, { Component } from "react";
import { WebView } from "react-native";

import { connect } from "react-redux";
import qs from "query-string";
import axios from "axios";

import { redirectUri, uri } from "./constants";

import { clientId, clientSecret } from "../secret.json";

class Login extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Login"
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      gotCredentials: false
    };
  }

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

    if (url && !gotCredentials && url.includes(redirectUri)) {
      this.setState({ gotCredentials: true });
      const { code } = qs.parse(qs.extract(url));
      navigation.goBack();
      axios
        .post(
          "https://accounts.spotify.com/api/token",
          qs.stringify({
            code: code,
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: "authorization_code",
            redirect_uri: redirectUri
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        )
        .then(
          res => {
            gotToken(res.data, code);
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
          uri: uri
        }}
        onNavigationStateChange={this.onNavigationStateChange}
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
      gotToken: (token, code) => {
        dispatch({
          type: "ACCESS_TOKEN",
          payload: token
        });
      }
    };
  }
)(Login);

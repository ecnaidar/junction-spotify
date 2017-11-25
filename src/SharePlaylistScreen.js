import React, { Component } from "react";
import { List, ListItem, Text, Thumbnail, Body, Content } from "native-base";

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

  componentDidMount() {
    const { token, playlists, gotPlaylists } = this.props;

    if (!playlists && token) {
      axios
        .get("https://api.spotify.com/v1/me/playlists", {
          headers: {
            Authorization: `Bearer ${token.access_token}`
          }
        })
        .then(
          res => {
            console.log("Got Playlists", res);
            gotPlaylists(res.data);
          },
          err => {
            console.log("REEEEE", err);
          }
        );
    }
  }

  render() {
    const { playlists } = this.props;
    console.log(playlists);

    return (
      <Content>
        <List
          style={{
            flex: 1,
            padding: 0
          }}
        >
          {playlists &&
            playlists.items.map(playlist => {
              return (
                <ListItem style={{ margin: 0 }}>
                  <Thumbnail
                    circular
                    size={80}
                    source={{ uri: playlist.images[0].url }}
                  />
                  <Body>
                    <Text>{playlist.name}</Text>
                    <Text note>{playlist.tracks.total}</Text>
                  </Body>
                </ListItem>
              );
            })}
        </List>
      </Content>
    );
  }
}

export default connect(
  state => {
    return {
      token: state.token,
      playlists: state.playlists
    };
  },
  dispatch => {
    return {
      gotPlaylists: playlists => {
        dispatch({
          type: "SET_PLAYLISTS",
          payload: playlists
        });
      }
    };
  }
)(Login);

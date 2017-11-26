import React, { Component } from "react";
import {
  List,
  ListItem,
  Text,
  Thumbnail,
  Body,
  Content,
  Right,
  Icon
} from "native-base";

import { connect } from "react-redux";
import qs from "query-string";
import axios from "axios";

import { baseRoute } from "./constants";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gotCredentials: false
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: `Share Playlist`
  });

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
    const { playlists, user, navigation, gotSpots } = this.props;
    const { state: navigationState } = navigation;
    const { params } = navigationState;
    const { coords } = params;
    console.log(this.props);

    return (
      <Content>
        <List style={{}}>
          {playlists &&
            playlists.items.map(playlist => {
              return (
                <ListItem
                  key={playlist.id}
                  style={{ paddingLeft: 10, marginLeft: 0 }}
                  button
                  onPress={() => {
                    console.log("sharing playlist");
                    axios
                      .get(
                        baseRoute +
                          "/add_spot?" +
                          qs.stringify({
                            verified_user_id: user.id,
                            playlist_id: playlist.id,
                            ...coords
                          })
                      )
                      .then(
                        res => {
                          gotSpots(res.data);
                          navigation.goBack();
                        },
                        err => {
                          console.log(err);
                        }
                      );
                  }}
                >
                  <Thumbnail
                    circular
                    size={80}
                    source={{ uri: playlist.images[0].url }}
                  />
                  <Body>
                    <Text>{playlist.name}</Text>
                    <Text note>{playlist.tracks.total} tracks</Text>
                  </Body>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
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
      user: state.user,
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
      },
      gotSpots: spots => {
        dispatch({
          type: "SET_SPOTS",
          payload: spots
        });
      }
    };
  }
)(Login);

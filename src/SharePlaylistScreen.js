import React, { Component } from "react";
import { View } from "react-native";
import {
  List,
  ListItem,
  Text,
  Thumbnail,
  Body,
  Button,
  Content,
  Right,
  Icon
} from "native-base";

import { connect } from "react-redux";
import qs from "query-string";
import axios from "axios";

import { baseRoute } from "./constants";
import { addSpot, makePublic } from "./api";
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
    const { playlists, user, token, navigation, gotSpots } = this.props;
    const { state: navigationState } = navigation;
    const { params } = navigationState;
    const { coords } = params;
    console.log(this.props);

    return (
      <Content>
        <List style={{}}>
          {playlists &&
            playlists.items
              .filter(playlist => user.id === playlist.owner.id)
              .map(playlist => {
                return (
                  <PlaylistItem
                    key={playlist.id}
                    share={() =>
                      addSpot(user.id, playlist.id, coords).then(
                        res => {
                          gotSpots(res.data);
                          navigation.goBack();
                        },
                        err => {
                          console.log(err);
                        }
                      )
                    }
                    makePublic={() => makePublic(user.id, playlist.id, token)}
                    playlist={playlist}
                  />
                );
              })}
        </List>
      </Content>
    );
  }
}

class PlaylistItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startedSharing: false
    };
  }

  render() {
    const { playlist, share, makePublic } = this.props;
    const { startedSharing } = this.state;

    return (
      <ListItem
        style={{ paddingLeft: 10, marginLeft: 0 }}
        button
        onPress={() => {
          console.log("sharing playlist");
          if (playlist.public) {
            share();
          } else {
            this.setState({ startedSharing: true });
          }
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
        {startedSharing ? (
          <Right>
            <View style={{ flexDirection: "row" }}>
              <Text>Make public?</Text>
              <Button
                style={{ backgroundColor: "black" }}
                onPress={() =>
                  makePublic().then(
                    res => {
                      console.log("made public", res);
                      share();
                    },
                    err => {
                      console.error(err);
                    }
                  )
                }
              >
                <Text>Yes</Text>
              </Button>
              <Button style={{ backgroundColor: "black", marginLeft: 5 }}>
                <Text onPress={() => this.setState({ startedSharing: false })}>
                  No
                </Text>
              </Button>
            </View>
          </Right>
        ) : (
          <Right>
            {!playlist.public && <Icon name="lock" />}
            <Icon name="arrow-forward" />
          </Right>
        )}
      </ListItem>
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

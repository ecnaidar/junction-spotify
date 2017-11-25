import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import axios from "axios";
import { connect } from "react-redux";
import {
  Header,
  Body,
  Title,
  Right,
  Text,
  Button,
  Container,
  Content,
  Fab,
  Icon
} from "native-base";

class Profile extends Component {
  componentWillReceiveProps(nextProps) {
    const { user, token } = nextProps;
    this.getUser(user, token);
  }

  componentWillMount() {
    const { user, token } = this.props;
    this.getUser(user, token);
  }

  getUser(user, token) {
    const { setUser } = this.props;
    if (!user && token) {
      axios
        .get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${token.access_token}`
          }
        })
        .then(
          res => {
            console.log("Got User", res);
            setUser(res.data);
          },
          err => {
            console.log("REEEEE", err);
          }
        );
    }
  }
  render() {
    const { user, navigation } = this.props;
    console.log("Profile props", this.props);
    if (user) {
      return <Text>{user.id}</Text>;
    }
    return (
      <Button transparent onPress={() => navigation.navigate("Login")}>
        <Text>Login</Text>
      </Button>
    );
  }
}

const ConnectedProfile = connect(
  state => {
    return {
      user: state.user,
      token: state.token
    };
  },
  dispatch => {
    return {
      setUser: user =>
        dispatch({
          type: "SET_USER",
          payload: user
        })
    };
  }
)(Profile);

class Map extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: <ConnectedProfile navigation={navigation} />
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      myCoords: undefined,
      fabActive: false
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const { latitude, longitude } = coords;
      this.setState({
        region: { ...this.state.region, latitude, longitude },
        myCoords: { latitude, longitude }
      });
    });
  }

  render() {
    const { region, myCoords } = this.state;
    const { navigation, token } = this.props;
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          region={region}
        >
          {myCoords && <MapView.Marker coordinate={myCoords} title="ME" />}
        </MapView>
        {token && (
          <Fab
            style={{ backgroundColor: "#5067FF" }}
            position="bottomRight"
            onPress={() => navigation.navigate("SharePlaylist")}
          >
            <Icon name="share" />
          </Fab>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});

export default connect(state => {
  return { token: state.token };
})(Map);

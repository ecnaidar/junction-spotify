// @flow
import axios from "axios";
import qs from "query-string";
import { baseRoute } from "./constants";

export const addSpot = (userId, playlistId, coords) =>
  axios.get(
    baseRoute +
      "/add_spot?" +
      qs.stringify({
        verified_user_id: userId,
        playlist_id: playlistId,
        ...coords
      })
  );

export const makePublic = (userId, playlistId, token) =>
  axios.put(
    `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}`,
    {
      public: true
    },
    {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
        "Content-Type": "application/json"
      }
    }
  );

import { clientId, clientSecret } from "../secret.json";


export const baseRoute =
  "http://ec2-18-195-139-209.eu-central-1.compute.amazonaws.com/";

export const userScope = ["user-read-private", "playlist-read-private"];

export const redirectUri = "http://spotify.junction.example/";

export const uri =
  "https://accounts.spotify.com/authorize" +
  "?response_type=code" +
  "&client_id=" +
  clientId +
  "&scope=" +
  encodeURIComponent(userScope.join(" ")) +
  "&redirect_uri=" +
  encodeURIComponent(redirectUri);


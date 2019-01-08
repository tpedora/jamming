let accessToken;
const clientId = '5c035add292c42d590ccd514a598dbc3';
const redirectUrl = 'http://localhost:3000/';

const Spotify = {
// Method to get user token if provided, if not, use an auth uri to generate access token
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    } else if (window.location.href.match(/access_token=([^&]*)/) && window.location.href.match(/expires_in=([^&]*)/)) {
      accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
      expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];

      window.setTimeout(() => accessToken = '', expiresIn*1000);
      window.history.pushState('Access Token', null, '/');

      return accessToken;
    } else {
      let url = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      window.location = url;
    }
  },
// Search method to hook to Spotify savePlaylist
  search(term) {
    fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${this.getUserAccessToken()}`
      }
    }).then(response => {
      if (response.ok) {
        return reponse.ok;
      }
      throw new Error('Request failed!');
    }, networkError => console.log(networkError.message)
  ).then(jsonResponse => {
    const tracks = jsonResponse.map(track => {
      id: track.id,
      name: track.name,
      artist: track.artist,
      album: track.album,
      uri: track.uri
    });
    return tracks;
    })
  },
// Method to save a users playListTrack
  savePlaylist(name, trackUris) {
    if (!name && trackUris.length === 0) {
      return;
    }
    const userAccessToken = userAccToken;
    const headers = {Authorization: getUserAccessToken()};
    let userId;
// Below is an api call to generate userId
    const url = 'https://api.spotify.com/v1';
    const userName = name;
    const endpointId = `${url}${userName}`;
// Get request to receive userId
    fetch(endpointId).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request failed!');
    }, networkError => console.log(networkError.message)
  ).then(jsonResponse => {
     let userId = jsonResponse;
    })
// Post request to create the new playlist for the users
    fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      method: 'POST',
      headers: {
        Authorization: getUserAccessToken(),
        'Content-Type': 'application/jsonReponse'
      },
      body: {
        name: name
      }
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request failed!');
    }, networkError => console.log(networkError.message)
  ).then(jsonResponse => {
    let playlistID = jsonReponse.id;
    return playlistID;
  })
}

export default Spotify;

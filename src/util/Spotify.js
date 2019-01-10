let accessToken;
const clientID = '5c035add292c42d590ccd514a598dbc3';
const redirectURI = 'http://localhost:3000/';

const Spotify = {
// Method to get user token if provided, if not, use an auth uri to generate access token
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    } else if (window.location.href.match(/access_token=([^&]*)/) && window.location.href.match(/expires_in=([^&]*)/)) {
      accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
      const expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];

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
    let accessToken = this.getAccessToken();

    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => response.json()).then(jsonResponse => {
      if (jsonResponse.ok) {
        return jsonResponse.tracks.items.map(track => {
          return ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          });
        })
      }
    }, networkError => console.log(networkError.message));
  },
// Method to save a users playListTrack
  savePlaylist(name, trackUris) {
    let accessToken = this.getAccessToken();
    if (!name && trackUris.length === 0) {
      return;
    }

    let userId;
    let playlistId;
    const currentUser = 'https://api.spotify.com/v1/me';
    let userName = '';
    const endpointId = `${currentUser}`;
// Below is an api call to generate userId
    return fetch(endpointId, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => response.json()
      ).then(jsonResponse => {
          if(jsonResponse.ok) {
            let userId = jsonResponse.id;

// Post request to create the new playlist for the users
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/jsonReponse'
              },
              body: JSON.stringify({
                name: name
              })
            }
            ).then(response => response.json()).then(jsonResponse => {
              let playlistId = jsonResponse.id;
              return playlistId;
// POST to create new playlist in the user accounts
            fetch(`https://api.spotify.com/v1/users/${userId}/${playlistId}/tracks`, {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/jsonReponse'
              },
              body: JSON.stringify({
                uris: trackUris
              })
            }).then(response => response.json()).then(jsonResponse => {
              let playlistId = jsonResponse.id;
              return playlistId;
            });
          });
        }
      }, networkError => console.log(networkError.message));
    }
  }

export default Spotify;

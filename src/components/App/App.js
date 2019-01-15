import React from 'react';
import './App.css';
import Playlist from '../Playlist/Playlist.js';
import SearchResults from '../SearchResults/SearchResults.js';
import SearchBar from '../SearchBar/SearchBar.js';
import Spotify from '../../util/Spotify';
//Module to render all other components to index.js

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playListName: 'Coding Playlist',
      playListTracks: []
    };
    //Binding for methods using this
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }
  //Method to allow user to add track to playListTrack
  addTrack(track) {
    if (this.state.playListTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } else {
      let currentPlayList = this.state.playListTracks.slice();
      currentPlayList.push(track);
      this.setState({playListTracks: currentPlayList});
    }
  }
  //Method to remove track from playListTrack
  removeTrack(track) {
      let currentPlayList = this.state.playListTracks.filter(savedTrack => savedTrack.id !== track.id);
      this.setState({playListTracks: currentPlayList});
    }
// Method to update playlist className
  updatePlaylistName(name) {
    this.setState({playListName: name});
  }
// Method to generate uri array, and save playlist to spotify account
  savePlaylist() {
    const trackUris = [];
    for (let i = 0; i < this.state.playListTracks.length; i++) {
      trackUris.push(this.state.playListTracks[i].uri);
    }
    Spotify.savePlaylist(this.state.playListName, trackUris);
    this.setState({playListName: 'New Playlist',
    playListTracks: []});
  }
// Search method to hook to Spotify API and return values
  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults});
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist playListName={this.state.playListName}
            playListTracks={this.state.playListTracks}
            onRemove={this.removeTrack}
            onNameChange={this.updatePlaylistName}
            onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

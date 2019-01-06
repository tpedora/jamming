import React from 'react';
import './App.css';
import PlayList from '../PlayList/PlayList.js';
import SearchResults from '../SearchResults/SearchResults.js';
import SearchBar from '../SearchBar/SearchBar.js';
//Module to render all other components to index.js
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [{
        name: 'Heart of The Matter',
        artist: 'Don Henley',
        album: 'The Best Of',
        id: 1
      }, {
        name: 'Superstition',
        artist: 'Stevie Wonder',
        album: 'Songs in the key of life',
        id: 2
      }],
      playListName: 'Coding Playlist',
      playListTracks: [{
        name: 'Heart of The Matter',
        artist: 'Don Henley',
        album: 'The Best Of',
        id: 1
      }]
    };
    //Binding for methods using this
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
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
      let currentPlayList = this.state.playListTracks.filter(savedTrack => savedTrack.id != track.id);
      this.setState({playListTracks: currentPlayList});
    }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <PlayList playListName={this.state.playListName}
            playListTracks={this.state.playListTracks}
            onRemove={this.removeTrack}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

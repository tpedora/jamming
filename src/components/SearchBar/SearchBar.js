import React from 'react';
import './SearchBar.css';

//Component to handle rendering the SearchBar and functionality
class SearchBar extends React.Component {
  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" />
        <a>SEARCH</a>
      </div>
    )
  }
}

export default SearchBar;

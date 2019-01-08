import React from 'react';
import './SearchBar.css';

//Component to handle rendering the SearchBar and functionality
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
    }
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }
// Method to handle the change of the term setState
  handleTermChange(e) {
    this.setState({term: e.target.value});
  }
// Search method to pass the state of the term to the app.js handler
  search() {
    this.props.onSearch(this.state.term);
  }

  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange}/>
        <a onClick={this.search}>SEARCH</a>
      </div>
    )
  }
}

export default SearchBar;

import { Component } from 'react';
// import PropTypes from 'prop-types';

export class Searchbar extends Component {
  state = {
    query: '',
  };
  onInputClick = event => {
    this.setState({ query: event.currentTarget.value.toLowerCase() });
  };
  onSubmit = event => {
    event.preventDefault();
    if (this.state.query.trim() === '') {
      alert('Enter your search request, please!');
      return;
    }
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };
  render() {
    return (
      <header className="searchbar">
        <form onSubmit={this.onSubmit} className="form">
          <input
            className="input"
            name="query"
            value={this.state.query}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onInputClick}
          />
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>
        </form>
      </header>
    );
  }
}
// Searchbar.propTypees = {
//   onSubmitHandler: PropTypes.func.isRequired, // Ensure it's a function and required
// };
import { Component } from 'react';

export class Searchbar extends Component {
  state = {
    query: '',
  };
  onInputClick = event => {
    this.setState({ query: event.currentTarget.value.toLowerCase() });
  };
  onSubmitHandler = event => {
    event.preventDefault();
    if (this.state.query.trim() === '') {
      alert('Enter your search request, please!');
      return;
    }
    this.props.onSubmitHandler(this.state.query);
    this.setState({ query: '' });
  };
  render() {
    return (
      <header className="searchbar">
        <form onSubmit={this.onSubmitHandler} className="form">
          <input
            className="input"
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

import { Component } from 'react';
import css from './SearchBar.module.css'

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
      <header className={css.Searchbar}>
        <form onSubmit={this.onSubmit} className={css.SearchForm}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>
          <input
            className={css.SearchFormInput}
            name="query"
            value={this.state.query}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onInputClick}
          />
        </form>
      </header>
    );
  }
}
// Searchbar.propTypees = {
//   onSubmitHandler: PropTypes.func.isRequired, // Ensure it's a function and required
// };
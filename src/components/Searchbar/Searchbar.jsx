import { useState } from 'react';
import css from './SearchBar.module.css';
import Notiflix from 'notiflix';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const onInputClick = event => {
    setQuery(event.currentTarget.value.toLowerCase());
  };
  const handleSubmit = event => {
    event.preventDefault();
    if (query.trim() === '') {
      Notiflix.Notify.info('Enter your search request, please!');
      return;
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <header className={css.Searchbar}>
      <form onSubmit={handleSubmit} className={css.SearchForm}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>
        <input
          className={css.SearchFormInput}
          name="query"
          value={query}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onInputClick}
        />
      </form>
    </header>
  );
};

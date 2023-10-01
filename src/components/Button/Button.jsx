import css from './Button.module.css'

export const Button = ({ onLoadMore }) => {
  return (
    <button  onClick={onLoadMore} className={css.Button}>
      Load more
    </button>
  );
};

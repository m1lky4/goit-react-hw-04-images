import React from 'react';
import s from './Button.module.css';

export const ButtonLoadMore = ({ loadMore }) => {
  const handleClick = event => {
    event.preventDefault();
    loadMore();
  };

  return (
    <button className={s.Button} type="button" onClick={handleClick}>
      Load more
    </button>
  );
};

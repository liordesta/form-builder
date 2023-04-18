import React from 'react';
import spinner from '../../../assets/spinner.svg';
import classes from './LoadingSpinner.module.css';

export const LoadingSpinner = () => {
  return (
    <div className={classes.loader}>
      <img src={spinner} alt='Loading...' />
    </div>
  );
};

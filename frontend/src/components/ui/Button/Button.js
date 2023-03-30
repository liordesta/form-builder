import classes from './Button.module.css';

export const Button = ({ btnType, styleType, onClickCb, children }) => {
  return (
    <button
      className={`${classes.primary_btn} ${
        styleType === 'secondary' ? classes.secondary_btn : ''
      }`}
      onClick={onClickCb}
      type={btnType}
    >
      {children}
    </button>
  );
};

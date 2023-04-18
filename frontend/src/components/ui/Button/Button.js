import classes from './Button.module.css';

export const Button = ({
  btnType,
  styleType,
  onClickCb,
  children,
  isDisabled,
}) => {
  return (
    <button
      className={`${classes.primary_btn} ${
        styleType === 'secondary' ? classes.secondary_btn : ''
      } ${isDisabled ? classes.btnDisabled : ''}`}
      onClick={onClickCb}
      type={btnType}
    >
      {children}
    </button>
  );
};

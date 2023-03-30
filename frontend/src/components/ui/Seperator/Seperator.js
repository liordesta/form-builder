import classes from './Seperator.module.css';

export const Seperator = ({ type }) => {
  return (
    <div
      className={`${
        type === 'vertical' ? classes.vertical : classes.horizontal
      }`}
    ></div>
  );
};

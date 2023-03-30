import { Seperator } from '../Seperator/Seperator';
import classes from './Header.module.css';

export const Header = ({ title, description }) => {
  return (
    <div>
      <div className={classes.header}>
        <h4>{title}</h4>
        <h6>{description}</h6>
      </div>
      <Seperator />
    </div>
  );
};

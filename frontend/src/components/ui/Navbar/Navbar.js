import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import menu from '../../../assets/menu.svg';
import classes from './Navbar.module.css';

export const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className={classes.navbar}>
      <div className={classes.logo_wrapper}>
        <Link to='/'>
          <img className={classes.navbar_logo} src={logo} alt='logo' />
        </Link>
      </div>
      <div className={classes.navbar_links}>
        <Link to='/'>Home</Link>
        <Link to='/create-form'>Create Form</Link>
        <Link to='/get-form'>Get Form</Link>
      </div>
      <div
        className={classes.navbar_hamburger}
        onClick={() => setShowMenu(!showMenu)}
      >
        <img className={classes.navbar_menuIcon} src={menu} alt='hamburger' />
      </div>
      {showMenu && (
        <div className={classes.navbar_menu}>
          <Link to='/'>Home</Link>
          <Link to='/create-form'>Create Form</Link>
          <Link to='/get-form'>Get Form</Link>
        </div>
      )}
    </nav>
  );
};

import React from 'react';
import { useLocation, Link } from 'react-router-dom';

import logoPath from '../images/logo.svg';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';


export default function Header(props) {
  const singOut = () => {
    localStorage.removeItem('token');
    props.history.push('/sign-in');
  }

  const currentUser = React.useContext(CurrentUserContext);
  const location = useLocation();
  const authNavBar = <>
    <span className="header__profile-info">{currentUser.email}</span>
    <Link className="link header__link" onClick={singOut}>Выйти</Link>
  </>
  const unAuthNavBar = {
    '/sign-up': <Link className="link header__link" to="/sign-in">Войти</Link>,
    '/sign-in': <Link className="link header__link" to="/sign-up">Регистрация</Link>,
  }

  return (
    <header className="header">
      <img src={logoPath}
           alt="Логотип Mesto"
           className="header__logo" />
      <nav className="header__navbar">
        {props.isAuthenticated ? authNavBar : unAuthNavBar[location.pathname]}
      </nav>
    </header>
  )
}

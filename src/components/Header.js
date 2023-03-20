import React from 'react';
import { useLocation, Link } from 'react-router-dom';

import logoPath from '../images/logo.svg';


export default function Header(props) {
  const singOut = () => {
    localStorage.removeItem('token');
    props.history.push('/sign-in');
  }

  const location = useLocation();
  const navLinks = {
    '/sign-up': <Link className="link" to="/sign-in">Войти</Link>,
    '/sign-in': <Link className="link" to="/sign-up">Регистрация</Link>,
    '/': <Link className="link" onClick={singOut} to="/sign-in">Выйти</Link>,
  }

  return (
    <header className="header">
      <img src={logoPath}
           alt="Логотип Mesto"
           className="header__logo" />
      <nav className="header__navbar">{navLinks[location.pathname]}</nav>
    </header>
  )
}

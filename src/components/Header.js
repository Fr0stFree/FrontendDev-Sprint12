import React, {Component} from 'react';
import { NavLink, Link } from 'react-router-dom';

import logoPath from '../images/logo.svg';
import {CurrentUserContext} from "../contexts/CurrentUserContext";


export default class Header extends Component {
  static contextType = CurrentUserContext;

  render() {
    return (
    <header className="header">
      <img src={logoPath}
           alt="Логотип Mesto"
           className="header__logo" />
      <nav className="header__navbar">
        {this.props.isAuthenticated ? <><span className="header__profile-info">{this.context.email}</span>
                                        <Link className="link header__link" onClick={this.props.onSignOut}>Выйти</Link></>
                                    : <><NavLink className={({isActive}) => isActive ? 'header__link_hidden' : 'link header__link'} to="/sign-in">Войти</NavLink>
                                        <NavLink className={({isActive}) => isActive ? 'header__link_hidden' : 'link header__link'} to="/sign-up">Регистрация</NavLink></>}
      </nav>
    </header>
    )
  }
}

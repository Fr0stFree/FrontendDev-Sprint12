import React, { Component } from 'react';

import logoPath from '../images/logo.svg';


export default class Header extends Component {
  render() {
    return (
    <header className="header">
      <img src={logoPath}
           alt="Логотип Mesto"
           className="header__logo" />
    </header>
    )
  }
}

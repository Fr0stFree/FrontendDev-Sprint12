import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Auth from "./Auth.js";


export default class Register extends Component {
  handleSubmit = (password, login) => this.props.onSubmit(password, login);

  render() {
    return (
      <Auth title="Регистрация"
            name="register"
            onSubmit={this.handleSubmit}
            buttonTitle="Зарегистрироваться">
        <p className="auth__login-hint">Уже зарегистрированы? <Link className="link" to="/sign-in">Войти</Link></p>
      </Auth>
    )
  }
}
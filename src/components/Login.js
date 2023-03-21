import React, {Component} from 'react';

import Auth from "./Auth.js";


export default class Login extends Component {

  handleSubmit = (password, email) => this.props.onSubmit(password, email);

  render() {
    return (
      <Auth title="Вход"
            name="login"
            onSubmit={this.handleSubmit}
            buttonTitle="Войти" />
    )
  }
}

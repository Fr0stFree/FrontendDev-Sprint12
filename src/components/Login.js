import React, { Component } from 'react';
import { Navigate } from "react-router-dom";

import Auth from "./Auth.js";
import authApi from "../utils/authApi";


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  async handleLogin(password, email) {
    try {
      const response = await authApi.login(password, email);
      if (response.token) {
        localStorage.setItem('token', response.token);
        this.props.onAuthentication();
      }
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <>
        {this.props.isAuthenticated && <Navigate to="/" replace={true} />}
        <Auth title="Вход"
              name="login"
              onSubmit={this.handleLogin}
              buttonTitle="Войти" />
      </>
    )
  }
}

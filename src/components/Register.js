import React, { Component } from 'react';
import {Link, Navigate} from 'react-router-dom';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import authApi from "../utils/authApi.js";
import Auth from "./Auth.js";
import InfoTooltip from "./InfoTooltip";


export default class Register extends Component {
  static contextType = CurrentUserContext;

  constructor(props) {
    super(props);
    this.state = {
      isInfoTooltipOpen: false,
      hasRegistrationFailed: false,
    }
    this.handleRegistration = this.handleRegistration.bind(this);
  }

  closeInfoTooltip = () => this.setState({isInfoTooltipOpen: false})

  async handleRegistration(password, email) {
    try {
      const response = await authApi.register(password, email);
      this.setState({isInfoTooltipOpen: true, hasRegistrationFailed: false});
    } catch (error) {
      this.setState({isInfoTooltipOpen: true, hasRegistrationFailed: true});
    }
  }

  render() {
    return (
      <>
        {this.props.isAuthenticated && <Navigate to="/" replace={true} />}
        <Auth title="Регистрация"
              name="register"
              onSubmit={this.handleRegistration}
              buttonTitle="Зарегистрироваться">
          <p className="auth__login-hint">Уже зарегистрированы? <Link className="link" to="/sign-in">Войти</Link></p>
        </Auth>
        <InfoTooltip hasFailed={this.state.hasRegistrationFailed}
                     isOpen={this.state.isInfoTooltipOpen}
                     onClose={this.closeInfoTooltip} />
      </>
    )
  }
}
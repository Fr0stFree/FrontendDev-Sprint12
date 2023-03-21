import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import authApi from "../utils/authApi.js";
import Auth from "./Auth.js";
import InfoTooltip from "./InfoTooltip";
import NavigatePage from "./NavigatePage";


export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInfoTooltipOpen: false,
      hasRegistrationFailed: false,
      shouldNavigate: false,
    }
    this.handleRegistration = this.handleRegistration.bind(this);
  }

  closeInfoTooltip = () => this.setState({isInfoTooltipOpen: false})

  async handleRegistration(password, email) {
    try {
      await authApi.register(password, email);
      this.setState({isInfoTooltipOpen: true, hasRegistrationFailed: false});
      setTimeout(() => this.setState({shouldNavigate: true}), 2500);
    } catch (error) {
      this.setState({isInfoTooltipOpen: true, hasRegistrationFailed: true});
    }
  }

  render() {
    return (
      <NavigatePage to="/sign-in" isNavigate={this.state.shouldNavigate}>
        <Auth title="Регистрация"
              name="register"
              onSubmit={this.handleRegistration}
              buttonTitle="Зарегистрироваться">
          <p className="auth__login-hint">Уже зарегистрированы? <Link className="link"
                                                                      to="/sign-in">Войти</Link>
          </p>
        </Auth>
        <InfoTooltip hasFailed={this.state.hasRegistrationFailed}
                     isOpen={this.state.isInfoTooltipOpen}
                     onClose={this.closeInfoTooltip} />
      </NavigatePage>
    )
  }
}
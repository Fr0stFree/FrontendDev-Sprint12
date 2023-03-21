import React, {Component} from 'react';

import Auth from "./Auth.js";
import InfoTooltip from "./InfoTooltip";
import authApi from "../utils/authApi";


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInfoTooltipOpen: false,
      hasLoginFailed: false,
    }
    this.handleLogin = this.handleLogin.bind(this);
  }
  closeInfoTooltip = () => this.setState({isInfoTooltipOpen: false})

  async handleLogin(password, email) {
    try {
      const response = await authApi.login(password, email);
      if (response.token) {
        localStorage.setItem('token', response.token);
        this.props.onAuthentication(response.token);
      }
    } catch (error) {
      this.setState({isInfoTooltipOpen: true, hasLoginFailed: true});
    }
  }

  render() {
    return (
      <>
        <Auth title="Вход"
              name="login"
              onSubmit={this.handleLogin}
              buttonTitle="Войти" />
        <InfoTooltip hasFailed={this.state.hasLoginFailed}
                     isOpen={this.state.isInfoTooltipOpen}
                     onClose={this.closeInfoTooltip} />
      </>
    )
  }
}

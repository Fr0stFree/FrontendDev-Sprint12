import React, { Component } from 'react';


export default class Auth extends Component {
    constructor(props) {
      super(props);
      this.state = {
        email: '',
        password: '',
      };
      this.handleSubmit = this.handleSubmit.bind(this);
    }

  handleInputChange = event => this.setState({[event.target.name]: event.target.value})

  handleSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.onSubmit(password, email);
  }

  render() {
    return (
      <div className="auth">
        <h2 className="auth__title">{this.props.title}</h2>
        <form className="auth__form"
              onSubmit={this.props.onSubmit}
              name={`${this.props.name}-form`}>
          <input id="form-email"
                 type="email"
                 value={this.state.email}
                 onChange={this.handleInputChange}
                 className="auth__input auth__input_type_text"
                 name="email"
                 placeholder="Email"
                 minLength="6"
                 maxLength="30"
                 required />
          <input id="form-password"
                 type="password"
                 value={this.state.password}
                 onChange={this.handleInputChange}
                 className="auth__input auth__input_type_text"
                 name="password"
                 placeholder="Пароль"
                 minLength="6"
                 maxLength="30"
                 required />
          <button type="submit"
                  onClick={this.handleSubmit}
                  className="button auth__input auth__input_type_submit">{this.props.buttonTitle}</button>
        </form>
        {this.props.children}
      </div>
    );
  }
}
import React, { Component } from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';


export default class EditProfilePopup extends Component {
  static contextType = CurrentUserContext;

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      about: '',
    };
  }

  handleInputChange = event => this.setState({[event.target.name]: event.target.value})

  handleSubmit = event => {
    event.preventDefault();
    const {name, about} = this.state;
    this.props.onUpdateUser(name, about);
  }

  componentDidUpdate(prevProps, prevState) {
    const hasOpened = prevProps.isOpen !== this.props.isOpen && this.props.isOpen
    if (hasOpened) {
      const {name, about} = this.context;
      this.setState({name, about});
    }
  }

  render() {
    return (
      <PopupWithForm title="Редактировать профиль"
                     name="profile"
                     buttonTitle="Сохранить"
                     onSubmit={this.handleSubmit}
                     onClose={this.props.onClose}
                     isOpen={this.props.isOpen}>
        <input id="name-input"
               type="text"
               value={this.state.name}
               onChange={this.handleInputChange}
               className="popup__input popup__input_type_name text-input"
               name="name"
               placeholder="Введи имя"
               minLength="2"
               maxLength="40"
               required />
        <span className="popup__input-error name-input-error"></span>
        <input id="about-input"
               type="text"
               value={this.state.about}
               onChange={this.handleInputChange}
               className="popup__input popup__input_type_about text-input"
               name="about"
               placeholder="Введите описание"
               minLength="2"
               maxLength="200"
               required />
        <span className="popup__input-error about-input-error"></span>
      </PopupWithForm>
    )
  }
}

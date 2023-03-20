import React, { Component } from 'react';
import PopupWithForm from "./PopupWithForm";


export default class AddPlacePopup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      place: '',
      link: '',
    };
  }

  handleInputChange = event => this.setState({[event.target.name]: event.target.value})

  handleSubmit = event => {
    event.preventDefault();
    const {place, link} = this.state;
    this.props.onAddPlace(place, link);
  }

  render() {
    return (
      <PopupWithForm title="Новое место"
                     name="card"
                     onSubmit={this.handleSubmit}
                     buttonTitle="Сохранить"
                     onClose={this.props.onClose}
                     isOpen={this.props.isOpen}>
        <input id="place-input"
               type="text"
               value={this.state.place}
               onChange={this.handleInputChange}
               className="popup__input popup__input_type_place text-input"
               name="place"
               placeholder="Введите название"
               required
               minLength="2" maxLength="30" />
        <span className="popup__input-error place-input-error"></span>
        <input id="link-input"
               type="url"
               value={this.state.link}
               onChange={this.handleInputChange}
               className="popup__input popup__input_type_link text-input"
               name="link"
               placeholder="Укажите ссылку"
               required />
        <span className="popup__input-error link-input-error"></span>
      </PopupWithForm>
    )
  }
}
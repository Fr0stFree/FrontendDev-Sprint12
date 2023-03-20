import React, { Component } from 'react';
import PopupWithForm from "./PopupWithForm";


export default class EditAvatarPopup extends Component {
  constructor(props) {
    super(props);
    this.avatarRef = React.createRef();
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.onUpdateAvatar(this.avatarRef.current.value);
  }

  render() {
    return (
      <PopupWithForm title="Обновить аватар"
                     name="avatar"
                     buttonTitle="Сохранить"
                     onSubmit={this.handleSubmit}
                     onClose={this.props.onClose}
                     isOpen={this.props.isOpen}>
        <input id="avatar-input"
               type="url"
               ref={this.avatarRef}
               className="popup__input popup__input_type_avatar text-input"
               name="avatar"
               placeholder="Укажите ссылку"
               required />
        <span className="popup__input-error avatar-input-error"></span>
      </PopupWithForm>
    )
  }
}

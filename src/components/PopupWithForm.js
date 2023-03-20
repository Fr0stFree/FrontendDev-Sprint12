import React, { Component } from 'react';


export default class PopupWithForm extends Component {
  render() {
    return (
      <div className={`popup popup_type_${this.props.name}${this.props.isOpen ? ' popup_opened' : ''}`}>
        <div className="popup__container">
          <button type="button"
                  onClick={this.props.onClose}
                  className="button popup__close-button"
                  aria-label="Закрыть всплывающее окно"></button>
          <div className="popup__content">
            <h2 className="popup__title">{this.props.title}</h2>
            <form className={`popup__${this.props.name}-form`}
                  onSubmit={this.props.onSubmit}
                  name={`${this.props.name}-form`}>
              {this.props.children}
              <button type="submit"
                      className="popup__input popup__input_type_submit">{this.props.buttonTitle}
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
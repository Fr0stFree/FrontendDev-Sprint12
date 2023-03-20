import React, { Component } from 'react';

import iconOnSuccess from '../images/tooltip-icon__type_success.svg';
import iconOnFail from '../images/tooltip-icon__type_fail.svg';


export default class InfoTooltip extends Component {
  render() {
    return (
      <div className={`popup popup_type_tooltip${this.props.isOpen ? " popup_opened" : ""}`}>
        <div className="popup__container">
          <button type="button"
                  onClick={this.props.onClose}
                  className="button popup__close-button"
                  aria-label="Закрыть попап"></button>
          <div className="popup__content popup__content_type_tooltip">
            <img className="popup__tooltip-icon"
                 src={this.props.hasFailed ? iconOnFail : iconOnSuccess}
                 alt="Уведомление о результате" />
            <p className="popup__tooltip-text">
              {this.props.hasFailed ? 'Что-то пошло не так! Попробуйте ещё раз.' : 'Вы успешно зарегистрировались!'}
            </p>
          </div>
        </div>
      </div>
    )
  }
}

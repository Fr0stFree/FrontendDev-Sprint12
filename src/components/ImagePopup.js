import React, { Component } from 'react';


export default class ImagePopup extends Component {
  render() {
    return (
      <div className={`popup popup_type_image${this.props.card ? " popup_opened" : ""}`}>
        <div className="popup__container">
          <button type="button"
                  onClick={this.props.onClose}
                  className="button popup__close-button"
                  aria-label="Отдалить фотографию"></button>
          <figure className="popup__figure">
            <img className="popup__image"
                 src={this.props.card?.link}
                 alt={this.props.card && `Фотография "${this.props.card.name}" автора "${this.props.card.owner.name}"`}/>
            <figcaption className="popup__image-caption">{this.props.card?.name}</figcaption>
          </figure>
        </div>
      </div>
    )
  }
}

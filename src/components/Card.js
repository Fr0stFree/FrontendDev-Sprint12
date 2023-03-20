import React, { Component } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';


export default class Card extends Component {
  static contextType = CurrentUserContext;

  handleClick = () => this.props.onClick(this.props.card)

  handleLikeClick = () => this.props.onLikeClick(this.props.card)

  handleDeleteClick = () => this.props.onDeleteClick(this.props.card)

  render() {
    const isOwned = this.context._id === this.props.card.owner._id;
    const isLiked = this.props.card.likes.some(user => user._id === this.context._id);
    return (
      <article className="card">
        <img className="card__image"
             onClick={this.handleClick}
             src={this.props.card.link}
             alt={`Фотография "${this.props.card.name}" автора "${this.props.card.owner.name}"`} />
        {isOwned &&
        <button type="button"
                className="button card__remove-button"
                onClick={this.handleDeleteClick}
                aria-label="Удалить фотографию"></button>
        }
        <div className="card__body">
          <h2 className="card__title">{this.props.card.name}</h2>
          <div className="card__like-container">
            <button type="button"
                    onClick={this.handleLikeClick}
                    className={`button card__like-button${isLiked ? " card__like-button_active" : ''}`}
                    aria-label="Поставить лайк под фотографией"></button>
            <p className="card__like-counter">{this.props.card.likes.length}</p>
          </div>
        </div>
      </article>
    )
  }
}


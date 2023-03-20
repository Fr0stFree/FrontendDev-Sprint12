import React, { Component } from 'react';

import editButtonPath from '../images/edit-btn.svg';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';


export default class Main extends Component {
  static contextType = CurrentUserContext;

  render() {
    return (
      <main className="content">
        <section className="profile">
          <button type="button"
                  onClick={this.props.onEditAvatar}
                  className="button profile__avatar-button" aria-label="Изменить аватар">
            <img className="profile__avatar"
                 src={this.context.avatar}
                 alt="Фотография пользователя" />
            <img className="profile__avatar-edit"
                 src={editButtonPath} />
          </button>
          <div className="profile__info">
            <h1 className="profile__name">{this.context.name}</h1>
            <button type="button"
                    onClick={this.props.onEditProfile}
                    className="button profile__edit-button"
                    aria-label="Редактировать пользовательскую информацию"></button>
            <p className="profile__description">{this.context.about}</p>
          </div>
          <button type="button"
                  onClick={this.props.onAddPlace}
                  className="button profile__add-button"
                  aria-label="Добавить фотографию"></button>
        </section>
        <section className="elements">
          <ul className="elements__element-list">
            {this.props.cards.map(card =>
              <li key={card._id} className="elements__element">
                <Card card={card}
                      onClick={this.props.onCardClick}
                      onDeleteClick={this.props.onCardDeleteClick}
                      onLikeClick={this.props.onCardLikeClick} />
              </li>)
            }
          </ul>
        </section>
      </main>
    )
  }
}


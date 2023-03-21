import React, { Component } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import defaultAvatarPath from '../images/Jack-Iv-Kusto.svg';
import Header from './Header.js';
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import Register from "./Register.js";
import Login from "./Login.js";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import ProtectedRoute from "./ProtectedRoute.js";
import authApi from "../utils/authApi";
import api from '../utils/api.js';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Жак-Ив Кусто", about: "Исследователь Океана", avatar: defaultAvatarPath},
      isAuthenticated: false,
      cards: [],
      isEditProfilePopupOpen: false,
      isEditAvatarPopupOpen: false,
      isAddPlacePopupOpen: false,
      isDeletePlacePopupOpen: false,
      selectedCard: undefined,
    }

    this.handleCardLikeClick = this.handleCardLikeClick.bind(this);
    this.handleCardDeleteClick = this.handleCardDeleteClick.bind(this);
    this.handleUpdateUser = this.handleUpdateUser.bind(this);
    this.handleUpdateAvatar = this.handleUpdateAvatar.bind(this);
    this.handleAddPlace = this.handleAddPlace.bind(this);
    this.authenticate = this.authenticate.bind(this);
  }

  async componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      await this.authenticate(token);
    }
  }

  async authenticate(token) {
    try {
      const {data: {email}} = await authApi.verifyToken(token);
      this.setState({isAuthenticated: true});
      const [currentUser, cards] = await Promise.all([
        api.getUserInfo(), api.getInitialCards()
      ])
      currentUser.email = email;
      this.setState({currentUser, cards});
    } catch (error) {
      console.error(error);
    }
  }

  handleEditProfileClick = () => this.setState({ isEditProfilePopupOpen: true })

  handleEditAvatarClick = () => this.setState({ isEditAvatarPopupOpen: true })

  handleAddPlaceClick = () => this.setState({ isAddPlacePopupOpen: true })

  async handleCardLikeClick(card) {
    const isLiked = card.likes.some(user => user._id === this.state.currentUser._id);
    let newCard = null;
    try {
      if (isLiked) {
        newCard = await api.dislikeCard(card._id);
      } else {
        newCard = await api.likeCard(card._id);
      }
      this.setState({ cards: this.state.cards.map(c => c._id === newCard._id ? newCard : c)});
    } catch (error) {
      console.log(error);
    }
  }

  async handleCardDeleteClick(card) {
    try {
      await api.deleteCard(card._id);
      this.setState({cards: this.state.cards.filter(c => c._id !== card._id)});
    } catch (error) {
      console.log(error);
    }
  }

  async handleUpdateUser(name, about) {
    try {
      const currentUser = await api.editUserInfo(name, about);
      this.setState({currentUser});
      this.closeAllPopups();
    } catch (error) {
      console.log(error);
    }
  }

  async handleUpdateAvatar(avatar) {
    try {
      const currentUser = await api.updateUserAvatar(avatar);
      this.setState({currentUser});
      this.closeAllPopups();
    } catch (error) {
      console.log(error);
    }
  }

  async handleAddPlace(place, link) {
    try {
      const newPlace = await api.addCard(place, link);
      this.setState({cards: [newPlace, ...this.state.cards]});
      this.closeAllPopups();
    } catch (error) {
      console.log(error);
    }
  }

  handleCardClick = card => this.setState({ selectedCard: card })

  closeAllPopups = () => {
    this.setState({
      isEditProfilePopupOpen: false,
      isEditAvatarPopupOpen: false,
      isAddPlacePopupOpen: false,
      isDeletePlacePopupOpen: false,
      selectedCard: undefined,
    });
  }

  render() {
    return (
      <div className="page">
        <CurrentUserContext.Provider value={this.state.currentUser}>
          <Header isAuthenticated={this.state.isAuthenticated} />
          <Routes>
            <Route path="/sign-up" element={this.state.isAuthenticated ? <Navigate to="/" />
                                                                       : <Register />} />
            <Route path="/sign-in" element={this.state.isAuthenticated ? <Navigate to="/" />
                                                                       : <Login onAuthentication={this.authenticate} />} />
            <Route path="/" element={<ProtectedRoute component={Main}
                                                     onEditProfile={this.handleEditProfileClick}
                                                     onAddPlace={this.handleAddPlaceClick}
                                                     cards={this.state.cards}
                                                     isAuthenticated={this.state.isAuthenticated}
                                                     onCardClick={this.handleCardClick}
                                                     onCardDeleteClick={this.handleCardDeleteClick}
                                                     onCardLikeClick={this.handleCardLikeClick}
                                                     onEditAvatar={this.handleEditAvatarClick} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Footer />
          <PopupWithForm title="Вы уверены?"
                         name="confirm"
                         buttonTitle="Да"
                         onClose={this.closeAllPopups}
                         isOpen={this.state.isDeletePlacePopupOpen} />
          <EditAvatarPopup onClose={this.closeAllPopups}
                           onUpdateAvatar={this.handleUpdateAvatar}
                           isOpen={this.state.isEditAvatarPopupOpen} />
          <EditProfilePopup onClose={this.closeAllPopups}
                            onUpdateUser={this.handleUpdateUser}
                            isOpen={this.state.isEditProfilePopupOpen} />
          <AddPlacePopup onClose={this.closeAllPopups}
                         onAddPlace={this.handleAddPlace}
                         isOpen={this.state.isAddPlacePopupOpen} />
          <ImagePopup onClose={this.closeAllPopups}
                      card={this.state.selectedCard} />
        </CurrentUserContext.Provider>
      </div>
    );
  }
}

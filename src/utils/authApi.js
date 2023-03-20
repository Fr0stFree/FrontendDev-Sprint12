class AuthApi {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  async register(password, email) {
    try {
      const response = await fetch(`${this._baseUrl}/signup`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({password, email})
      });
      return await this._checkResponse(response);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async login(password, email) {
    try {
      const response = await fetch(`${this._baseUrl}/signin`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({password, email})
      });
      return await this._checkResponse(response);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async verifyToken(token) {
    try {
      const response = await fetch(`${this._baseUrl}/users/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      return await this._checkResponse(response);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async _checkResponse(res) {
    if (res.ok) {
      return await res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }
}

export default new AuthApi({
  baseUrl: 'https://auth.nomoreparties.co',
  headers: {
    "Content-Type": "application/json",
  }
})

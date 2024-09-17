export default class Api {
    constructor(options) {
        this._options = options;
        this._baseUrl = this._options.baseUrl;
        this.isComplete = false;
    }

    //the basic root functions that send requests out or brings them in- parameterized with ammendments to the fetch body

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Error ${res.status}`);
    }

    _request(url) {
        return fetch(this._baseUrl + url, this._options).then(this._checkResponse).finally(() => {this._reset()});
        
    }

    _reset() {
        this._options.method = "";
        this._options.body = null;
    }

    _fetchX = (endpoint, how) => {//new, condensed hotness
        this._options.method = how;
        return this._request(endpoint);
    }
    
    _sendX = (endpoint, parcel, how) => {//new condensed hotness
        this._options.method = how;
        this._options.body = JSON.stringify(parcel);
        return this._request(endpoint);
    }

    //putting the root functions to task- these are all PUBLIC

    getCards() {
        return this._fetchX("/cards", "GET");
    }    
    
    postCard(parcel) {
        return this._sendX("/cards", parcel, "POST");
    }

    patchCard(parcel) {
        return this._sendX("/cards", parcel, "PATCH");
    }

    likeCard(cardId) {
        return this._fetchX(`/cards/${cardId}/likes`, "PUT");
    }

    unlikeCard(cardId) {
        return this._fetchX(`/cards/${cardId}/likes`, "DELETE");
    }

    deleteCard(cardId) {
       return this._fetchX(`/cards/${cardId}`, "DELETE");
    }

    getUserInfo() {
       return this._fetchX("/users/me", "GET");
    }

    patchInfo(parcel) {
        return this._sendX("/users/me", parcel, "PATCH");
    }

    patchAvatar(parcel) {
        return this._sendX("/users/me/avatar", parcel, "PATCH");
    }
    
}
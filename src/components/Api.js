export default class Api {
    constructor(options) {
        this._options = options;
        this._baseUrl = this._options.baseUrl;
        this.isComplete = false;
    }

    //the basic root functions that send requests out or brings them in- parameterized with ammendments to the fetch body

    _fetchX = (endpoint, how) => {
        this._options.method = how;
        return fetch(this._baseUrl + endpoint, this._options)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        })
        .then(data => {
            this.isComplete = true;
            return data;
        })
        .catch((err) => {
            console.log(`WHOOPSIES ON THE FETCH: the ` + how + ` has failed in execution, reporting ` + err);
        })
        .finally(() => {
            this._options.method = "";
            this.isComplete = false;
        });
    }

    _sendX = (endpoint, parcel, how) => {
        this._options.method = how;
        this._options.body = JSON.stringify(parcel);   
        return fetch(this._baseUrl + endpoint, this._options)
        .then(res => {
            if (res.ok) {
                console.log(res.ok);
                console.log(res.status);
                return res.json();
            }
            return Promise.reject(`uh ohs on the send: ${res.status}`);
        })        
        .then(data => {
            console.log(data);
            return data;
        })
        .catch((err) => {
            console.log(`Error: ` + err);
        })
        .finally(() => {
            this._options.method = "";
            this._options.body = null;
        });
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
        this._fetchX(`/cards/${cardId}/likes`, "PUT");
    }

    unlikeCard(cardId) {
        this._fetchX(`/cards/${cardId}/likes`, "DELETE");
    }

    deleteCard(cardId) {
       this._fetchX(`/cards/${cardId}`, "DELETE");
    }

    getUserInfo() {
       return this._fetchX("/users/me", "GET");
    }

    patchInfo(parcel) {
        this._sendX("/users/me", parcel, "PATCH");
    }

    patchAvatar(parcel) {
        this._sendX("/users/me/avatar", parcel, "PATCH");
    }
}
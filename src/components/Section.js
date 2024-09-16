export default class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  clear() {//made this public because I found a use for it. edit: No I did not. Delete works fine now. Still nice to have the nuclear option in the back of pocket, I guess?
    this._container.innerHTML = "";
  }

  renderItems() {    
    this._items[0].forEach((item) => {//there's probably a more elegant way to do this than accessing an array position but this works well enough for me, which is to say at all. Kinda a quirk with storing the API data and needing to store/access after initializing the card section. ¯\_(ツ)_/¯
      this._renderer(item);      
    });    
  }

  addItem(element) {
    this._container.prepend(element);
  }
}

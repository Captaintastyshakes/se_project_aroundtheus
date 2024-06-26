export default class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  _clear() {
    this._container.innerHTML = "";
  }

  renderItems() {
    //this._clear();//is this necessary?
    /*this._items.forEach((item) => {
      this._renderer(item);
    });*/
    this._items.forEach(this._renderer);//refactor of the above to be slightly more elegant.
  }

  addItem(element) {
    this._container.prepend(element);
  }
}

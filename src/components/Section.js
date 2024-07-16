export default class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  clear() {//made this public because I found a use for it.
    this._container.innerHTML = "";
  }

  renderItems() {
    this._items.forEach(this._renderer);//refactor of the above to be slightly more elegant.
    //NOW this seems to largely be irrelevent since I'm not really handling the initial gallery with the section methods anymore- 
    //or at least I'm not relying on an intial array from before that I can just pass to the Section, (this gave me an ENORMOUS headache trying to do,) it's all iterative from the package I get from the API, generating cards from each object I get back.
    //that being said I am not necessarily ready to code this out, can't shake the feeling it could hypothetically be useful in the future. I'm feeding it a null array until further notice. ¯\_(ツ)_/¯
  }

  addItem(element) {
    this._container.prepend(element);
  }
}

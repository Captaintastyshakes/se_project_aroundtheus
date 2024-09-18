export default class Section {
  //constructor({ items, renderer }, selector) {
  constructor({renderer}, selector) {
    //this._items = items;//null'd this so the renderItems func can accept any array you pass to it- like, say, an array from the api
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  clear() {//made this public because I found a use for it. edit: No I did not. Delete works fine now. Still nice to have the nuclear option in the back of pocket, I guess?
    this._container.innerHTML = "";
  }
  
  renderItems(items) {
    items.forEach((item) => {//as I mentioned above this will now accept any array rather than being dependent on whatever is passed to the constructor.
      this._renderer(item);
    });    
  }

  addItem(element) {
    this._container.prepend(element);
  }
}

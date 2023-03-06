export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderer = renderer;
    this._items = items;
    this._container = document.querySelector(containerSelector);
    this.renderItems()
  }

  addItem(element) {
    this._container.prepend(element);
  }

  updateList(items) {
    this._items = items
    this.renderItems()
  }

  renderItems() {
    this._items.reverse().forEach((item) => {
      this._renderer(item);
    });
  };
}


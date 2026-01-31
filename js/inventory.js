import { getInventory, saveInventory } from "./storage.js";

class Inventory {
  constructor() {
    this._items = getInventory();
  }

  get items() {
    return this._items;
  }

  add(name, quantity) {
    const newItem = {
      _id: Date.now(),
      _name: name,
      _quantity: quantity,
      _checked: false,
    };
    this._items.push(newItem);
    this._save();
    return newItem;
  }

  delete(id) {
    this._items = this._items.filter((item) => item._id !== id);
    this._save();
  }

  update(id, name, quantity) {
    const item = this.findById(id);
    if (item) {
      item._name = name;
      item._quantity = quantity;
      this._save();
    }
    return item;
  }

  findById(id) {
    return this._items.find((item) => item._id === id);
  }

  toggleChecked(id) {
    const item = this.findById(id);
    if (item) {
      item._checked = !item._checked;
      this._save();
    }
    return item;
  }

  _save() {
    saveInventory(this._items);
  }
}

export default Inventory;

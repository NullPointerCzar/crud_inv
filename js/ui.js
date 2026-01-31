class UI {
  constructor(listElement) {
    this._list = listElement;
  }

  renderItems(items) {
    this._list.innerHTML = "";

    items.forEach((item) => {
      const li = document.createElement("li");
      if (item._checked) {
        li.classList.add("checked");
      }

      li.innerHTML = `
        <input type="checkbox" class="item-checkbox" data-id="${item._id}" ${item._checked ? "checked" : ""}>
        <span class="item-name">${item._name}</span>
        <span class="item-qty">(${item._quantity})</span>
        <button class="edit-btn" data-id="${item._id}">Edit</button>
        <button class="delete-btn" data-id="${item._id}">Delete</button>
      `;
      this._list.appendChild(li);
    });
  }

  showEditForm(li, item) {
    li.innerHTML = `
      <input class="edit-name" type="text" value="${item._name}" />
      <input class="edit-qty" type="number" value="${item._quantity}" min="1" />
      <button class="save-btn" data-id="${item._id}">Save</button>
      <button class="cancel-btn" data-id="${item._id}">Cancel</button>
    `;
  }

  getEditValues(li) {
    const name = li.querySelector(".edit-name").value.trim();
    const quantity = parseInt(li.querySelector(".edit-qty").value);
    return { name, quantity };
  }
}

export default UI;

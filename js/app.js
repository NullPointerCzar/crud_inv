import { getInventory, saveInventory } from "./storage.js";

let inventory = getInventory();

const form = document.getElementById("item-form");
const nameInput = document.getElementById("item-name");
const qtyInput = document.getElementById("item-qty");
const list = document.getElementById("item-list");

const renderInventory = () => {
  list.innerHTML = "";

  inventory.forEach((item) => {
    const li = document.createElement("li"); //naya list tag nai banne bhayo

    li.innerHTML = `
        <span class="item-name">${item._name}</span>
        <span class="item-qty">(${item._quantity})</span>
        <button class="edit-btn" data-id="${item._id}">Edit</button>
        <button class="delete-btn" data-id="${item._id}">Delete</button>
    `;
    list.appendChild(li);
  });
};

// Initial render
renderInventory();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const itemName = nameInput.value.trim();
  const quantity = parseInt(qtyInput.value);

  const newItem = {
    _id: Date.now(),
    _name: itemName,
    _quantity: quantity,
  };

  inventory.push(newItem);
  saveInventory(inventory);

  console.log(inventory);
  renderInventory();

  form.reset();
});

list.addEventListener("click", function(e){
    const id = parseInt(e.target.dataset.id);
    const item = inventory.find(i => i._id === id);

    if(e.target.classList.contains("delete-btn")){
        inventory = inventory.filter(i => i._id !== id);
        saveInventory(inventory);
        renderInventory();
    }

    if(e.target.classList.contains("edit-btn")){
        const li = e.target.parentElement;

        // Replace text with inputs
        li.innerHTML = `
            <input class="edit-name" type="text" value="${item._name}" />
            <input class="edit-qty" type="number" value="${item._quantity}" min="1" />
            <button class="save-btn" data-id="${item._id}">Save</button>
            <button class="cancel-btn" data-id="${item._id}">Cancel</button>
        `;
    }

    // Save changes
    if(e.target.classList.contains("save-btn")){
        const li = e.target.parentElement;
        const newName = li.querySelector(".edit-name").value.trim();
        const newQty = parseInt(li.querySelector(".edit-qty").value);

        if(newName && newQty){
            item._name = newName;
            item._quantity = newQty;
            saveInventory(inventory);

            renderInventory();
        }
    }

    // Cancel edit
    if(e.target.classList.contains("cancel-btn")){
        renderInventory();
    }
});

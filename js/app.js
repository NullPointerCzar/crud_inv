let inventory = [];

const form = document.getElementById("item-form");
const nameInput = document.getElementById("item-name");
const qtyInput = document.getElementById("item-qty");
const list = document.getElementById("item-list");

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

  console.log(inventory);

  form.reset();
});

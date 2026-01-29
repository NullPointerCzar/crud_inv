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
  renderInventory();

  form.reset();
});

const renderInventory = () => {
  list.innerHTML = "";

  inventory.forEach((item) => {
    const li = document.createElement("li");

    li.textContent = `${item._name} (Qty: ${item._quantity})`;
    list.appendChild(li);
  });
};

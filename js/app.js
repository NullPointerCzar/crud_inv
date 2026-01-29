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
    const li = document.createElement("li"); //euta naya list tag nai banne bhayo

    li.innerHTML = `
        ${item._name} (Qty: ${item._quantity})
        <button class="delete-btn" data-id="${item._id}">Delete</button>
    `;
    list.appendChild(li);
  });
};

list.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const id = parseInt(e.target.dataset.id);
    inventory = inventory.filter((item) => item._id !== id);
    renderInventory();  //re-rendering after deletion
  }
});

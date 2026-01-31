import Inventory from "./inventory.js";
import UI from "./ui.js";

// Initialize
const inventory = new Inventory();
const ui = new UI(document.getElementById("item-list"));

const form = document.getElementById("item-form");
const nameInput = document.getElementById("item-name");
const qtyInput = document.getElementById("item-qty");

// Helper to re-render
const render = () => ui.renderItems(inventory.items);

// Initial render
render();

// Add new item
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const itemName = nameInput.value.trim();
  const quantity = parseInt(qtyInput.value);

  inventory.add(itemName, quantity);
  render();
  form.reset();
});

// Handle list clicks (delete, edit, save, cancel)
document.getElementById("item-list").addEventListener("click", (e) => {
  const id = parseInt(e.target.dataset.id);
  const item = inventory.findById(id);

  // Delete
  if (e.target.classList.contains("delete-btn")) {
    inventory.delete(id);
    render();
  }

  // Edit - show edit form
  if (e.target.classList.contains("edit-btn")) {
    const li = e.target.parentElement;
    ui.showEditForm(li, item);
  }

  // Save changes
  if (e.target.classList.contains("save-btn")) {
    const li = e.target.parentElement;
    const { name, quantity } = ui.getEditValues(li);

    if (name && quantity) {
      inventory.update(id, name, quantity);
      render();
    }
  }

  // Cancel edit
  if (e.target.classList.contains("cancel-btn")) {
    render();
  }

  // Toggle checkbox
  if (e.target.classList.contains("item-checkbox")) {
    inventory.toggleChecked(id);
    render();
  }
});

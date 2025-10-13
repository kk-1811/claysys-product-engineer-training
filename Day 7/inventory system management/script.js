// Product class
class Product {
  constructor(name, price, quantity) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }

  updateQuantity(amount) {
    this.quantity += amount;
  }

  displayDetails() {
    return `
      <tr>
        <td>${this.name}</td>
        <td>$${this.price.toFixed(2)}</td>
        <td>${this.quantity}</td>
      </tr>`;
  }
}

const inventory = [];

function displayInventory() {
  const tbody = document.querySelector("#inventoryTable tbody");
  tbody.innerHTML = "";
  inventory.forEach((product) => {
    tbody.innerHTML += product.displayDetails();
  });
}

document.getElementById("addBtn").addEventListener("click", () => {
  const name = document.getElementById("name").value.trim();
  const price = parseFloat(document.getElementById("price").value);
  const quantity = parseInt(document.getElementById("quantity").value);

  if (!name || isNaN(price) || isNaN(quantity)) {
    alert("⚠️ Please fill in all fields correctly!");
    return;
  }

  const product = new Product(name, price, quantity);
  inventory.push(product);

  displayInventory();

  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("quantity").value = "";
});

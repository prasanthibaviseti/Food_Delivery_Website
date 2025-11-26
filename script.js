// CART ARRAY
let cart = [];

// SELECT ALL "Add to Cart" BUTTONS
const addButtons = document.querySelectorAll(".add-to-cart");

// EVENT LISTENER FOR EACH BUTTON
addButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.parentElement;

    const name = card.querySelector("h3").innerText;
    const price = parseFloat(
      card.querySelector(".price").innerText.replace("$", "")
    );

    addToCart(name, price);
  });
});

// ADD ITEM TO CART
function addToCart(name, price) {
  cart.push({ name, price });

  updateCart();
  showAddedNotification(name);
}

// UPDATE CART DISPLAY
function updateCart() {
  const cartContainer = document.getElementById("cart-container");

  if (!cartContainer) return; // If no cart on page, exit

  cartContainer.innerHTML = ""; // Clear existing

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    const li = document.createElement("li");
    li.classList.add("cart-item");
    li.innerHTML = `
      ${item.name} - $${item.price.toFixed(2)}
      <button class="remove-btn" data-index="${index}">x</button>
    `;
    cartContainer.appendChild(li);
  });

  document.getElementById("total-amount").innerText = total.toFixed(2);

  // REMOVE BUTTON FUNCTIONALITY
  const removeBtns = document.querySelectorAll(".remove-btn");
  removeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = btn.getAttribute("data-index");
      cart.splice(index, 1);
      updateCart();
    });
  });
}

// CUTE POPUP WHEN ITEM ADDED
function showAddedNotification(name) {
  const note = document.createElement("div");
  note.classList.add("popup");

  note.innerText = `${name} added to cart 💗`;

  document.body.appendChild(note);

  setTimeout(() => {
    note.remove();
  }, 1500);
}

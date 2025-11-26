// Final cart (local images, local file friendly)
// cart array of { name, price, qty }
const cart = [];

// helpers
function findIndexByName(name) {
  return cart.findIndex(i => i.name === name);
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

// render cart DOM
function renderCart() {
  const container = document.getElementById('cart-container');
  const totalEl = document.getElementById('total-amount');
  container.innerHTML = '';

  let grandTotal = 0;

  cart.forEach((it, idx) => {
    grandTotal += it.price * it.qty;

    const li = document.createElement('li');
    li.className = 'cart-item';
    li.innerHTML = `
      <div class="item-left">
        <div class="item-name">${escapeHtml(it.name)}</div>
        <div class="item-price">₹${it.price.toFixed(2)}</div>
      </div>

      <div class="qty-box">
        <button class="decrease" data-index="${idx}">−</button>
        <span class="qty">${it.qty}</span>
        <button class="increase" data-index="${idx}">+</button>
      </div>
    `;
    container.appendChild(li);
  });

  totalEl.innerText = grandTotal.toFixed(2);
}

// event delegation for add/increase/decrease
document.addEventListener('click', function (e) {
  // Add to cart
  if (e.target.classList.contains('add-to-cart')) {
    const card = e.target.closest('.menu-card');
    if (!card) return;
    const name = card.dataset.name;
    const price = Number(card.dataset.price) || 0;

    const idx = findIndexByName(name);
    if (idx === -1) cart.push({ name, price, qty: 1 });
    else cart[idx].qty += 1;

    renderCart();
    showPopup(`${name} added to cart 💗`);
    return;
  }

  // Increase
  if (e.target.classList.contains('increase')) {
    const idx = Number(e.target.dataset.index);
    if (cart[idx]) {
      cart[idx].qty += 1;
      renderCart();
    }
    return;
  }

  // Decrease
  if (e.target.classList.contains('decrease')) {
    const idx = Number(e.target.dataset.index);
    if (!cart[idx]) return;
    if (cart[idx].qty > 1) cart[idx].qty -= 1;
    else cart.splice(idx, 1);
    renderCart();
    return;
  }
});

// popup
function showPopup(text) {
  const note = document.createElement('div');
  note.className = 'popup';
  note.innerText = text;
  document.body.appendChild(note);
  setTimeout(() => note.remove(), 1200);
}

// init
document.addEventListener('DOMContentLoaded', renderCart);

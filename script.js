document.addEventListener('DOMContentLoaded', function () {
    const menuSection = document.getElementById('menu');
    const cartSection = document.getElementById('cart');
    const cartItemsList = document.getElementById('cart-items');
    const totalCostDisplay = document.getElementById('total-cost');
  
    // Sample menu data
    const menuItems = [
      { name: 'Item 1', price: 10.99, description: 'Description 1', image: 'item1.jpg' },
      { name: 'Item 2', price: 12.99, description: 'Description 2', image: 'item2.jpg' },
      // Add more items as needed
    ];
  
    // Sample cart data
    const cartItems = [];
  
    // Render menu items
    menuItems.forEach(item => {
      const menuItemHTML = `
        <div class="menu-item">
          <img src="${item.image}" alt="${item.name}">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <p>${item.price.toFixed(2)}</p>
          <button onclick="addToCart('${item.name}', ${item.price})">Add to Cart</button>
        </div>
      `;
      menuSection.innerHTML += menuItemHTML;
    });
  
    // Add to Cart function
    window.addToCart = function (itemName, itemPrice) {
      const existingCartItem = cartItems.find(item => item.name === itemName);
  
      if (existingCartItem) {
        existingCartItem.quantity++;
      } else {
        cartItems.push({ name: itemName, price: itemPrice, quantity: 1 });
      }
  
      renderCart();
    };
  
    // Remove item from Cart function
    window.removeFromCart = function (itemName) {
      const itemIndex = cartItems.findIndex(item => item.name === itemName);
      if (itemIndex !== -1) {
        cartItems.splice(itemIndex, 1);
      }
  
      renderCart();
    };
  
    // Render Cart function
    function renderCart() {
      cartItemsList.innerHTML = '';
      let totalCost = 0;
  
      cartItems.forEach(item => {
        const cartItemHTML = `
          <li class="cart-item">
            <span>${item.name} - ${item.quantity} x $${item.price.toFixed(2)}</span>
            <button onclick="removeFromCart('${item.name}')">Remove</button>
          </li>
        `;
        cartItemsList.innerHTML += cartItemHTML;
  
        totalCost += item.price * item.quantity;
      });
  
      totalCostDisplay.textContent = `Total: $${totalCost.toFixed(2)}`;
    }
  });
  

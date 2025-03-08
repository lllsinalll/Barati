const products = [
  { id: 1, name: "Cheshme Man", price: 199, image: "dariush.jpg" },
  { id: 2, name: "Alamate Soal", price: 299, image: "shadmehr.jpg" },
  { id: 3, name: "Farangis", price: 149, image: "siavash.jpg" },
  { id: 4, name: "Gole Yakh", price: 79, image: "koorosh.jpg" },
  { id: 5, name: "Marde Tanha", price: 199, image: "farhad.jpg" },
  { id: 6, name: "Khodahafez", price: 299, image: "erfan.jpg" },
  { id: 7, name: "Ba To", price: 149, image: "tataloo.jpg" },
  { id: 8, name: "Mordab", price: 79, image: "googoosh.jpg" },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Dark Mode Functions
function initializeDarkMode() {
  const isDarkMode = localStorage.getItem("darkMode") === "true";
  document.body.classList.toggle("dark-mode", isDarkMode);
  const toggleIcon = document.querySelector(".dark-mode-toggle i");
  if (toggleIcon) {
    toggleIcon.className = isDarkMode ? "fas fa-sun" : "fas fa-moon";
  }
}

function handleDarkModeToggle() {
  document.body.classList.toggle("dark-mode");
  const isDarkMode = document.body.classList.contains("dark-mode");
  const toggleIcon = document.querySelector(".dark-mode-toggle i");
  toggleIcon.className = isDarkMode ? "fas fa-sun" : "fas fa-moon";
  localStorage.setItem("darkMode", isDarkMode);
}

// Cart Functions
function updateCartCount() {
  document.querySelector(".cart-count").textContent = cart.length;
}

function renderCartItems() {
  const cartItemsDiv = document.querySelector(".cart-items");
  cartItemsDiv.innerHTML = `
      ${cart
        .map(
          (item, index) => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}">
          <div class="cart-item-info">
            <h4>${item.name}</h4>
            <p>$${item.price}</p>
          </div>
          <button onclick="removeFromCart(${index})" class="remove-btn">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      `
        )
        .join("")}
      ${
        cart.length > 0
          ? `
        <div class="cart-total">
          Total: $${cart.reduce((sum, item) => sum + item.price, 0)}
        </div>
        <div class="cart-actions">
          <button class="checkout-btn">Continue to Pay</button>
        </div>
      `
          : '<p class="empty-cart">Your cart is empty</p>'
      }
    `;

  document
    .querySelector(".checkout-btn")
    ?.addEventListener("click", handleCheckout);
}

function handleCheckout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("Redirecting to payment gateway...");
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCartItems();
  renderProducts();
  document.querySelector(".cart-modal").classList.remove("active");
}

function removeFromCart(index) {
  const removedItem = cart.splice(index, 1)[0];
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCartItems();

  const productButton = document.querySelector(
    `button[onclick*="${removedItem.id}"]`
  );
  if (productButton) {
    productButton.classList.remove("added");
    productButton.innerHTML = "Add to Cart";
  }
}

// Product Functions
function renderProducts() {
  renderFilteredProducts(products);
}

function renderFilteredProducts(filteredProducts) {
  const productsSection = document.querySelector(".products");
  productsSection.innerHTML = filteredProducts
    .map(
      (product) => `
      <div class="product-card">
        <img src="${product.image}" class="product-image" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="price">$${product.price}</p>
        <button class="add-to-cart ${
          cart.some((p) => p.id === product.id) ? "added" : ""
        }" 
                onclick="toggleCart(${product.id}, this)">
          ${
            cart.some((p) => p.id === product.id)
              ? '<i class="fas fa-check"></i> Added'
              : "Add to Cart"
          }
        </button>
      </div>
    `
    )
    .join("");
}

function toggleCart(productId, button) {
  const productIndex = cart.findIndex((p) => p.id === productId);
  if (productIndex === -1) {
    cart.push(products.find((p) => p.id === productId));
  } else {
    cart.splice(productIndex, 1);
  }

  button.classList.toggle("added");
  button.innerHTML = cart.some((p) => p.id === productId)
    ? '<i class="fas fa-check"></i> Added'
    : "Add to Cart";

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCartItems();
}

// UI Interactions
function setupNavInteractions() {
  const homeLink = document.querySelector(".nav-link");
  homeLink.addEventListener("click", function (e) {
    e.preventDefault();
    document
      .querySelectorAll(".nav-link")
      .forEach((link) => link.classList.remove("active"));
    this.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.querySelector(".search-input").value = "";
    renderProducts();
  });

  homeLink.addEventListener(
    "mouseenter",
    () => (homeLink.style.transform = "translateY(-2px)")
  );
  homeLink.addEventListener(
    "mouseleave",
    () => (homeLink.style.transform = "translateY(0)")
  );
}

function initializeEventListeners() {
  const darkModeToggle = document.querySelector(".dark-mode-toggle");

  // Dark mode toggle interactions
  darkModeToggle.addEventListener("mousedown", () => {
    darkModeToggle.style.backgroundColor = "white";
    darkModeToggle.style.color = "var(--dark-color)";
  });

  darkModeToggle.addEventListener("mouseup", () => {
    darkModeToggle.style.backgroundColor = "";
    darkModeToggle.style.color = "";
  });

  darkModeToggle.addEventListener("mouseleave", () => {
    darkModeToggle.style.backgroundColor = "";
    darkModeToggle.style.color = "";
  });

  darkModeToggle.addEventListener("click", handleDarkModeToggle);

  // Search input
  document
    .querySelector(".search-input")
    .addEventListener("input", function (e) {
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      renderFilteredProducts(filteredProducts);
    });

  // Cart interactions
  document.querySelector(".cart-icon").addEventListener("click", () => {
    document.querySelector(".cart-modal").classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    const cartModal = document.querySelector(".cart-modal");
    if (
      !e.target.closest(".cart-modal") &&
      !e.target.closest(".cart-icon") &&
      !e.target.closest(".add-to-cart") &&
      !e.target.closest(".remove-btn")
    ) {
      cartModal.classList.remove("active");
    }
  });
}

// Initialization
function init() {
  initializeDarkMode();
  initializeEventListeners();
  setupNavInteractions();
  renderProducts();
  updateCartCount();
  renderCartItems();
}

init();

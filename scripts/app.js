document.addEventListener("DOMContentLoaded", () => {
  console.log("JavaScript Loaded Successfully!");

  // Hamburger Menu Toggle
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }

  // Product Display Logic
  const productGrid = document.getElementById("product-grid");
  const loading = document.getElementById("loading");

  function displayProducts(products) {
    if (!productGrid) return;

    productGrid.innerHTML = ''; // Clear existing products
    products.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}" loading="lazy">
        <h3>${product.title}</h3>
        <p>$${product.price}</p>
        <button onclick="addToCart('${product.id}')">Add to Cart</button>
      `;
      productGrid.appendChild(card);
    });
  }

  function fetchProducts() {
    if (loading) loading.style.display = 'block';

    const cached = sessionStorage.getItem("products");
    if (cached) {
      displayProducts(JSON.parse(cached));
      if (loading) loading.style.display = 'none';
    } else {
      fetch("https://fakestoreapi.com/products")
        .then(res => res.json())
        .then(data => {
          sessionStorage.setItem("products", JSON.stringify(data));
          displayProducts(data);
        })
        .catch(() => {
          if (loading) loading.textContent = "Failed to load products.";
        })
        .finally(() => {
          if (loading) loading.style.display = 'none';
        });
    }
  }

  fetchProducts();
});

// Add to Cart Function
function addToCart(productId) {
  alert(`Product ${productId} added to cart!`);
}


// Add to Cart Function
function addToCart(productId) {
  alert(`Product ${productId} added to cart!`);
}

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

const products = [
  { id: "1", name: "Smartphone", price: 699, description: "Great phone", image: "images/phone.jpg" },
  { id: "2", name: "Laptop", price: 999, description: "Powerful laptop", image: "images/laptop.jpg" }
];

const product = products.find(p => p.id === productId);

document.getElementById('product-detail-container').innerHTML = `
  <div class="product">
    <img src="${product.image}" alt="${product.name}" class="main-image">
    <h1>${product.name}</h1>
    <p>${product.description}</p>
    <h2>$${product.price}</h2>
    <button onclick="addToCart(${product.id})">Add to Cart</button>
  </div>
`;

function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("cart-count").textContent = cart.length;
}
updateCartCount();

const lens = document.getElementById('zoom-lens');
const img = document.getElementById('main-image');

img.addEventListener('mousemove', moveLens);
img.addEventListener('mouseenter', () => lens.style.display = 'block');
img.addEventListener('mouseleave', () => lens.style.display = 'none');

function moveLens(e) {
  const rect = img.getBoundingClientRect();
  const x = e.pageX - rect.left - window.scrollX - lens.offsetWidth / 2;
  const y = e.pageY - rect.top - window.scrollY - lens.offsetHeight / 2;
  lens.style.left = `${x}px`;
  lens.style.top = `${y}px`;
}
let selected = { size: '', color: '' };

function selectVariation(type, value) {
  selected[type] = value;
  console.log(selected); // for testing
}
let unitPrice = 999;
function changeQuantity(delta) {
  const qtyInput = document.getElementById('qty');
  let qty = parseInt(qtyInput.value);
  qty = Math.min(Math.max(qty + delta, 1), 10); // 1 to 10 limit
  qtyInput.value = qty;
  document.getElementById('total-price').innerText = unitPrice * qty;
}
function addToCart() {
  const qty = document.getElementById('qty').value;
  const cartData = { ...selected, quantity: qty };
  localStorage.setItem('cartItem', JSON.stringify(cartData));

  // Update cart count
  let count = parseInt(localStorage.getItem('cartCount') || 0) + parseInt(qty);
  localStorage.setItem('cartCount', count);
  document.getElementById('cart-feedback').style.display = 'block';
}



        

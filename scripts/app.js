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



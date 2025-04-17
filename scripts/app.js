document.addEventListener("DOMContentLoaded", () => {
  // Hamburger Menu Toggle
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // Product Grid Fetch and Render
  const grid = document.getElementById("productGrid");

  if (grid) {
    fetch("https://fakestoreapi.com/products")
      .then(response => response.json())
      .then(products => {
        products.forEach(product => {
          const card = document.createElement("div");
          card.className = "product-card";
          card.innerHTML = `
            <img src="${product.image}" alt="${product.title}" loading="lazy">
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
            <button onclick="addToCart('${product.id}')">Add to Cart</button>
          `;
          grid.appendChild(card);
        });
      })
      .catch(error => {
        console.error("Failed to load products:", error);
      });
  }
});

// Add to Cart Function
function addToCart(productId) {
  alert(`Product ${productId} added to cart!`);
}
document.addEventListener("DOMContentLoaded", () => {
  console.log("JavaScript Loaded Successfully!");  // Add this for debugging
  // Rest of your code...
});


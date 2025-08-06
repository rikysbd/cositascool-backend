const productsContainer = document.getElementById('products-container');

fetch('https://cositascool-backend.onrender.com/products')
  .then(response => response.json())
  .then(products => {
    products.forEach(product => {
      const productEl = document.createElement('div');
      productEl.className = 'product';

      productEl.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>${product.price.toFixed(2)} €</p>
        <button onclick="buyNow('${product.id}')">Comprar</button>
      `;

      productsContainer.appendChild(productEl);
    });
  })
  .catch(err => {
    console.error('Error al cargar productos:', err);
    productsContainer.innerHTML = '<p>No se pudieron cargar los productos.</p>';
  });

function buyNow(id) {
  alert('Compra simulada del producto con ID: ' + id);
}

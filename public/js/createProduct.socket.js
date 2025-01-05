const socket = io();

// Manejar la creación de productos
document
  .getElementById("createProductForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const product = {
      title: event.target.title.value,
      price: event.target.price.value,
      stock: event.target.stock.value,
      category: event.target.category.value,
      photo: event.target.photo.value || "none",
    };

    try {
      const response = await fetch("/products/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Producto creado exitosamente!");
        socket.emit("new product", product); // Enviar el producto al servidor vía socket
        event.target.reset();
      } else {
        alert("Error creando el producto: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });

// Función para renderizar productos
function renderProduct(product) {
  const productCard = `
    <div class="col-md-4 mb-3">
      <div class="card">
        <img src="${product.photo}" class="card-img-top" alt="${product.title}">
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">Precio: $${product.price}</p>
          <p class="card-text">Stock: ${product.stock}</p>
          <p class="card-text">Categoría: ${product.category}</p>
          <button class="btn btn-danger" onclick="deleteProduct('${product.id}')">Eliminar</button>
        </div>
      </div>
    </div>
  `;
  document
    .getElementById("productsContainer")
    .insertAdjacentHTML("beforeend", productCard);
}

// Escuchar los productos al conectarse
socket.on("update products", (products) => {
  document.getElementById("productsContainer").innerHTML = ""; // Limpia el contenedor antes de renderizar
  products.forEach(renderProduct); // Renderiza cada producto
});

// Escuchar nuevos productos agregados
socket.on("productCreated", (data) => {
  renderProduct(data.product);
});

// Función para eliminar un producto
async function deleteProduct(productId) {
  try {
    const response = await fetch(`/products/${productId}`, {
      method: "DELETE",
    });

    const data = await response.json();
    if (response.ok) {
      alert("Producto eliminado correctamente!");
      socket.emit("delete product", productId); // Emitir evento de eliminación al servidor
    } else {
      alert("Error eliminando el producto: " + data.message);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Escuchar productos eliminados
socket.on("productDeleted", (productId) => {
  const productCard = document.querySelector(
    `[data-product-id="${productId}"]`
  );
  if (productCard) {
    productCard.remove();
  }
});

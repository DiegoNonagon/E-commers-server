const socket = io();

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
        alert("Product created successfully!");
        socket.emit("new product", product); // Enviar el producto al servidor vía socket
      } else {
        alert("Error creating product: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });

// Escuchar nuevos productos agregados
socket.on("new product", (product) => {
  console.log("New product added:", product);
});

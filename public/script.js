const apiUrl = "http://localhost:5000/products";

async function fetchProducts() {
    const response = await fetch(apiUrl);
    const products = await response.json();
    
    const productList = document.getElementById("productList");
    productList.innerHTML = ""; 

    products.forEach(product => {
        const li = document.createElement("li");
        li.innerHTML = `${product.name} - $${product.price} 
            <button onclick="deleteProduct('${product.id}')">Delete</button>`;
        productList.appendChild(li);
    });
}

async function addProduct() {
    const name = document.getElementById("productName").value;
    const price = document.getElementById("productPrice").value;

    if (!name || !price) {
        alert("Please enter product name and price!");
        return;
    }

    await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price })
    });

    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";
    fetchProducts();
}

async function deleteProduct(id) {
    await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    fetchProducts();
}

fetchProducts();

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static("public"));

let products = [];
let id = 1;

// Get all products
app.get("/products", (req, res) => res.json(products));

// Add a product
app.post("/products", (req, res) => {
    const product = { id: id++, ...req.body };
    products.push(product);
    res.json(product);
});

// Delete a product
app.delete("/products/:id", (req, res) => {
    const productId = parseInt(req.params.id);
    products = products.filter(product => product.id !== productId);
    res.json({ message: "Product deleted" });
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));

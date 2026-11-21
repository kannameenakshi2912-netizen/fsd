const express = require("express");

const app = express();

app.use(express.json());

const products = [];

// CREATE PRODUCT
app.post("/products", (req, res) => {
    const product = req.body;

    products.push(product);

    res.status(201).json({
        message: "Product created successfully",
        data: product
    });
});

// GET ALL PRODUCTS
app.get("/products", (req, res) => {
    res.status(200).json({
        message: "Products fetched successfully",
        data: products
    });
});

// GET PRODUCT BY ID
app.get("/products/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    res.status(200).json({
        message: "Product found",
        data: product
    });
});

// UPDATE PRODUCT
app.put("/products/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    products[index] = {
        ...products[index],
        ...req.body,
        id: id
    };

    res.status(200).json({
        message: "Product updated successfully",
        data: products[index]
    });
});

// DELETE PRODUCT
app.delete("/products/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    const deletedProduct = products.splice(index, 1);

    res.status(200).json({
        message: "Product deleted successfully",
        data: deletedProduct[0]
    });
});

// START SERVER
app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
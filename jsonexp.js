const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

const file = "./data.json";

// GET all faculty
app.get("/api/v1/faculty", (req, res) => {
    const data = JSON.parse(fs.readFileSync(file, "utf-8"));
    res.json(data);
});

// GET faculty by ID
app.get("/api/v1/faculty/:id", (req, res) => {
    const data = JSON.parse(fs.readFileSync(file, "utf-8"));

    const faculty = data.find(
        f => f.id == req.params.id
    );

    if (faculty) {
        res.status(200).json({
            message: "faculty details fetched successfully",
            data: faculty
        });
    } else {
        res.status(404).json({
            message: "faculty not found"
        });
    }
});

// POST - Add faculty
app.post("/api/v1/faculty", (req, res) => {
    const data = JSON.parse(fs.readFileSync(file, "utf-8"));

    const faculty = {
        id: data.length + 1,
        name: req.body.name,
        department: req.body.department
    };

    data.push(faculty);

    fs.writeFileSync(file, JSON.stringify(data, null, 2));

    res.status(201).json({
        message: "faculty created successfully",
        data: faculty
    });
});

// PUT - Update faculty
app.put("/api/v1/faculty/:id", (req, res) => {
    const data = JSON.parse(fs.readFileSync(file, "utf-8"));

    const index = data.findIndex(
        f => f.id == req.params.id
    );

    if (index !== -1) {
        data[index] = {
            ...data[index],
            ...req.body
        };

        fs.writeFileSync(file, JSON.stringify(data, null, 2));

        res.status(200).json({
            message: "faculty updated successfully",
            data: data[index]
        });
    } else {
        res.status(404).json({
            message: "faculty not found"
        });
    }
});

// DELETE - Delete faculty
app.delete("/api/v1/faculty/:id", (req, res) => {
    const data = JSON.parse(fs.readFileSync(file, "utf-8"));

    const index = data.findIndex(
        f => f.id == req.params.id
    );

    if (index !== -1) {
        data.splice(index, 1);

        fs.writeFileSync(file, JSON.stringify(data, null, 2));

        res.status(200).json({
            message: "faculty deleted successfully"
        });
    } else {
        res.status(404).json({
            message: "faculty not found"
        });
    }
});

// Server
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
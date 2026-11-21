const http = require("http");

const server = http.createServer((req, res) => {

    // POST - Create a student
    if (req.method === "POST" && req.url === "/students") {

        res.writeHead(200, {
            "Content-Type": "text/html"
        });

        res.write("<h1>Student created successfully!</h1>");
        res.end();

    }

    // GET - List all students
    else if (req.method === "GET" && req.url === "/students") {

        res.writeHead(200, {
            "Content-Type": "text/html"
        });

        res.write("<h1>List of students</h1>");
        res.end();

    }

    // GET - Get student details
    else if (req.method === "GET" && req.url === "/students/1") {

        res.writeHead(200, {
            "Content-Type": "text/html"
        });

        res.write("<h1>Student details</h1>");
        res.end();

    }

    // PUT - Update student
    else if (req.method === "PUT" && req.url === "/students/1") {

        res.writeHead(200, {
            "Content-Type": "text/html"
        });

        res.write("<h1>Student updated successfully!</h1>");
        res.end();

    }

    // DELETE - Delete student
    else if (req.method === "DELETE" && req.url === "/students/1") {

        res.writeHead(200, {
            "Content-Type": "text/html"
        });

        res.write("<h1>Student deleted successfully!</h1>");
        res.end();

    }

    // Invalid URL / method
    else {

        res.writeHead(404, {
            "Content-Type": "text/html"
        });

        res.write("<h1>404 Not Found</h1>");
        res.end();
    }
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000/");
});
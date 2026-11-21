const http = require("http");

const students = [];

// Create HTTP server
const server = http.createServer((req, res) => {

    const { method, url } = req;

    // ==========================================
    // POST - Create a new student
    // ==========================================
    // POST http://localhost:3001/students
    // Body:
    // {"id":1,"name":"John Doe","age":20}

    if (method === "POST" && url === "/students") {

        let body = "";

        req.on("data", (chunk) => {
            body += chunk.toString();
        });

        req.on("end", () => {

            try {
                const newStudent = JSON.parse(body);

                students.push(newStudent);

                res.writeHead(201, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    message: "Student added successfully",
                    data: newStudent
                }));

            } catch (error) {

                res.writeHead(400, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    message: "Invalid JSON data"
                }));
            }
        });
    }


    // ==========================================
    // GET - Get all students
    // ==========================================
    // GET http://localhost:3001/students

    else if (method === "GET" && url === "/students") {

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            message: "List of students",
            data: students
        }));
    }


    // ==========================================
    // GET - Get student by ID
    // ==========================================
    // GET http://localhost:3001/students/1

    else if (
        method === "GET" &&
        url.startsWith("/students/")
    ) {

        const studentId = parseInt(url.split("/")[2]);

        const student = students.find(
            (s) => s.id === studentId
        );

        if (student) {

            res.writeHead(200, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                message: "Student details",
                data: student
            }));

        } else {

            res.writeHead(404, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                message: "Student not found"
            }));
        }
    }


    // ==========================================
    // PUT - Update student
    // ==========================================
    // PUT http://localhost:3001/students/1
    // Body:
    // {"name":"John Smith","age":21}

    else if (
        method === "PUT" &&
        url.startsWith("/students/")
    ) {

        const studentId = parseInt(url.split("/")[2]);

        let body = "";

        req.on("data", (chunk) => {
            body += chunk.toString();
        });

        req.on("end", () => {

            try {

                const updatedStudent = JSON.parse(body);

                const indexToUpdate = students.findIndex(
                    (s) => s.id === studentId
                );

                if (indexToUpdate !== -1) {

                    // Keep the original ID
                    updatedStudent.id = studentId;

                    students[indexToUpdate] = updatedStudent;

                    res.writeHead(200, {
                        "Content-Type": "application/json"
                    });

                    res.end(JSON.stringify({
                        message: "Student updated successfully",
                        data: students[indexToUpdate]
                    }));

                } else {

                    res.writeHead(404, {
                        "Content-Type": "application/json"
                    });

                    res.end(JSON.stringify({
                        message: "Student not found"
                    }));
                }

            } catch (error) {

                res.writeHead(400, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    message: "Invalid JSON data"
                }));
            }
        });
    }


    // ==========================================
    // DELETE - Delete student
    // ==========================================
    // DELETE http://localhost:3001/students/1

    else if (
        method === "DELETE" &&
        url.startsWith("/students/")
    ) {

        const studentId = parseInt(url.split("/")[2]);

        const indexToDelete = students.findIndex(
            (s) => s.id === studentId
        );

        if (indexToDelete !== -1) {

            const deletedStudent = students.splice(
                indexToDelete,
                1
            );

            res.writeHead(200, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                message: "Student deleted successfully",
                data: deletedStudent[0]
            }));

        } else {

            res.writeHead(404, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                message: "Student not found"
            }));
        }
    }


    // ==========================================
    // Invalid route
    // ==========================================

    else {

        res.writeHead(404, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            message: "Route not found"
        }));
    }
});


// ==========================================
// Start Server
// ==========================================

server.listen(3001, () => {
    console.log("Server running at http://localhost:3001");
});
const fs=require("fs");

    fs.writeFileSync("file.txt", "This is the Synchronous file in JavaScript");
    console.log("This is a writeFile of Synchronous");

    const data = fs.readFileSync("file.txt", "utf8");
    console.log(data);

    fs.appendFileSync("file.txt", "\nThis is the appended data in Synchronous");
    console.log("This is an appendFile of Synchronous");

    fs.unlinkSync("file.txt");
    console.log("This is unlinkFile of Synchronous");


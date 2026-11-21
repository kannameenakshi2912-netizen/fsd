const fs=require("fs");

fs.writeFile("file.txt","This is the Asynchronuous file in javascript",(err)=>{
    if (err) throw err;
    console.log("this is a writefile of synchronus");

    fs.readFile("file.txt","utf8",(err,data)=>{
        if (err) throw err;
        console.log(data);
        fs.appendFile("file.txt","This is the Asynchrouns file in javascript",(err)=>{
            if (err) throw err;
            console.log("This is a append file in Asynchrouns");

            
            fs.unlink("file.txt",(err)=>{
                if (err) throw err;
                console.log("This is unlink file in Asynchronuous");
            });
        });
    });
});
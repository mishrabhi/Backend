const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  //Home Route
  if (req.url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "plain/text");
    res.end("Hello Worldddd!");

    //Get Signup form
  } else if (req.url === "/signup") {
    const signUpForm = "index.html";
    fs.readFile(signUpForm, "utf-8", (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/plain");
        res.end("Error in getting sign-up page");
      } else {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.end(data);
      }
    });
    //Post signup form
  } else if (req.url === "/signup" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const parsedData = new URLSearchParams(body);
      const username = parsedData.get("username");
      const password = parsedData.get("password");

      const userData = `Username: ${username}, Password: ${password}\n`;
      fs.appendFile("users.txt", userData, (err) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "text/plain");
          res.end("Error saving user data");
        } else {
          res.statusCode = 200;
          res.setHeader("Content-Type", "text/plain");
          res.end("Thank you for signup");
        }
      });
    });

    //Get All Users list
  } else if (req.url === "/allusers") {
    fs.readFile("users.txt", "utf-8", (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/plain");
        res.end("Error rading user data");
      } else {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        res.end(`All Users: ${data}`);
      }
    });
    //Not Found
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("Not Found");
  }
});

server.listen(8080, () => {
  console.log("Server Up and running on port 8080");
});

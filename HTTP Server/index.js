const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Welcome to Home Page!");
  } else if (req.url === "/aboutus") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end(
      '<a href="https://www.masaischool.com" target="_blank">Welcome to About Page - Visit Masai School</a>'
    );
  } else if (req.url === "/contactus") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end(
      'Contact us at <a href="https://www.masaischool.com" target="_blank">www.masaischool.com</a>'
    );
  } else if (req.url === "/index") {
    const filePath = path.join(__dirname, "index.js");
    fs.readFile(filePath, "utf-8", (error, data) => {
      if (error) {
        res.end("Error Reading file");
      } else {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        res.end(data);
      }
    });
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("Not FOund");
  }
});

server.listen(8080, () => {
  console.log("Server up and running on port 8080");
});

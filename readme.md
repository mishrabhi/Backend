# Backend

- The backend refers to the server-side of a web application, where the core functionality of the application is implemented.
- It is responsible for processing client requests, managing databases, performing business logic, and ensuring that the appropriate data and services are delivered to the frontend.

## Client-Server Model

- The client-server model is a foundational concept in network architecture, where the communication between two parties is established through a client and a server.
- In this model, the **client** is typically a web browser or application that initiates requests for specific resources or services.
- The **server**, on the other hand, is a powerful computer or set of computers that processes these requests and sends back the appropriate responses, such as data, webpages, or files.

## Node.js

- NodeJS is an open-source, cross-platform runtime environment that allows you to run JavaScript code outside of a web browser.
- It is built on the V8 JavaScript engine developed by Google and is known for its non-blocking, event-driven architecture.

- **Asynchronous I/O:** Allows NodeJS to handle multiple operations simultaneously without waiting for one to complete before starting the next.

- **Event-driven Architecture:** Uses events and callbacks to handle asynchronous operations efficiently.

- **Single-threaded with Multi-core Support:** Operates on a single thread but can utilize multiple CPU cores for handling multiple tasks through the event loop.

### Modules in Node.js:

- Modules are reusable blocks of code that encapsulate specific functionality and can be imported and used in other parts of an application. NodeJS supports two primary types of modules:

- **CommonJS (CJS):** The traditional module system in NodeJS that uses synchronous require() calls to import modules and module.exports to export them.

- **ES Modules (ESM):** The modern standard for modules that uses asynchronous import and export statements. ES Modules can be used with .mjs file extension or by setting "type": "module" in package.json.

### Some Modules of NodeJS Used Commonly in Development:

### Express:

- **Purpose:** A minimal and flexible web framework that provides a robust set of features for building web and mobile applications.
- The express module allows you to create a web server and handle various HTTP requests like GET and POST.

- **Installation:** Run `npm install express` to add it to your project.

```
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

### Lodash:

- **Purpose:** A utility library that provides helpful functions for working with arrays, objects, and other data types.

- Lodash provides utility functions that simplify common programming tasks, such as manipulating arrays and objects.

**Installation:** Run `npm install lodash` to add it to your project.

```
const _ = require('lodash');
const array = [1, 2, 3];

console.log(_.reverse(array)); // Output: [3, 2, 1]
```

### Async:

- **Purpose:** A utility module for managing asynchronous operations and flows, such as series and parallel executions.

- The async module helps manage multiple asynchronous operations, ensuring tasks are completed in a specified order.

- **Installation:** Run `npm install async` to add it to your project.

```
const async = require('async');

async.series([
  function(callback) {
    setTimeout(() => callback(null, 'Result 1'), 1000);
  },
  function(callback) {
    setTimeout(() => callback(null, 'Result 2'), 500);
  }
], (err, results) => {
  if (err) {
    console.error(err);
  } else {
    console.log(results); // Output: ['Result 1', 'Result 2']
  }
});
```

### Third-Party Modules:

### Axios:

- **Purpose:** A promise-based HTTP client for making requests to APIs.
- **Installation**: Run `npm install axios` to add it to your project.

```
const axios = require('axios');

axios.get('https://api.example.com/data')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
```

### Built-in NodeJS Modules:

- NodeJS provides several built-in modules that offer core functionalities without requiring installation from npm.

### Crypto:

- **Purpose:** Provides cryptographic functionality, including operations like hashing, encryption, and decryption.
- The crypto module is essential for security-related tasks, such as generating hashes and encrypting data.

```
const crypto = require('crypto');

const hash = crypto.createHash('sha256');
hash.update('some data to hash');
console.log(hash.digest('hex')); // Outputs a SHA-256 hash
```

### File System (fs):

- **Purpose:** Provides an API for interacting with the file system, allowing you to read, write, and manage files and directories.
- The fs module is commonly used for file operations, such as reading from and writing to files in NodeJS applications.

```
const fs = require('fs');

fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data); // Outputs the contents of example.txt
});
```

### Operating System (os):

- **Purpose:** Provides operating system-related utility functions, such as retrieving information about the current user, system uptime, and available memory.

- The os module allows you to access information about the operating system, which can be useful for optimizing your application based on the environment it runs in.

```
const os = require('os');

console.log('OS Platform:', os.platform());
console.log('CPU Architecture:', os.arch());
console.log('Total Memory:', os.totalmem());
console.log('Free Memory:', os.freemem());
```

## HTTP:

- HTTP is a protocol that defines how messages are formatted and transmitted over the web. It specifies how requests and responses should be structured.

- It allows for the communication between web browsers and servers, enabling the delivery of web pages and services.

- HTTP can be compared to the language used in a conversation where specific rules ensure that both parties understand each other.

### Common HTTP Terminologies:

- **Request:** A message from the client requesting resources from the server.

- **Response:** The server’s reply to the client’s request.

- **Status Codes:** Numeric codes indicating the result of a request (e.g., 200 OK, 404 Not Found).

- **Headers**: Metadata included with requests and responses (e.g., Content-Type, Authorization).

- **Body:** The main content of the request or response.

### HTTP Server and Its Components:

- **Request:** Includes URL, parameters, query strings, body, and headers.
- **Response:** Includes status codes, headers, and body content.

```
const http = require("http");

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("GET request received");
  } else if (req.method === "POST") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("POST request received");
  }
});

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
```

### Cons of HTTP:

- Statelessness
- Lack of Encryption (HTTP, not HTTPS)
- Performance Overhead
- Limited Bandwidth Efficiency

## Express:

- Express.js is a web application framework for Node.js that makes it easier to build web applications by providing a set of tools and features for managing routes, handling requests, and adding middleware.

- Express simplifies web development by reducing the amount of boilerplate code needed to set up and manage servers. It is particularly useful for creating RESTful APIs and web applications.

```
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

### Creation of Server using Express:

- In Express, server creation involves defining routes that correspond to different URLs or endpoints. These routes determine how the server responds to incoming requests based on the HTTP method (GET, POST, etc.) used.

- Building a server with Express is essential for creating scalable, maintainable web applications. Express provides a structured way to handle different types of requests, making it easier to manage complex applications.

- Creating a server with multiple routes:

```
const express = require("express");
const app = express();

app.get("/api/users", (req, res) => {
  res.json({ message: "Get all users" });
});

app.post("/api/users", (req, res) => {
  res.json({ message: "Create a new user" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

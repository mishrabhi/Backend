// Import the built-in crypto module for generating random bytes
const crypto = require("crypto");

// Get command-line arguments, excluding the first two (node executable path and script path)
const args = process.argv.slice(2);
console.log(args); // Log the arguments to see what has been passed in the command line

// Define basic arithmetic functions using arrow functions, parsing the input arguments as integers
const add = (a, b) => parseInt(a) + parseInt(b); //Addition
const sub = (a, b) => parseInt(a) - parseInt(b); //Substraction
const mul = (a, b) => parseInt(a) * parseInt(b); //Multiplication
const div = (a, b) => parseInt(a) / parseInt(b); //Division

// Define trigonometric functions, parsing input as integers and using radians
const sine = (a) => Math.sin(parseInt(a)); //Sine of an angle(in radian)
const cosine = (a) => Math.cos(parseInt(a)); //Cos of an angle(in radian)
const tan = (a) => Math.tan(parseInt(a)); //Tan of an angle(in radian)

// Random byte generator using the crypto module
const random = (a) => {
  // Generate 'a' bytes of random data asynchronously
  crypto.randomBytes(parseInt(a), (err, buf) => {
    if (err) throw err; // Throw error if randomBytes fails
    console.log(
      `${buf.length} bytes of random data: ${buf.toString("binary")}` // Display the random bytes in binary format
    );
  });
};

// Switch case to determine which operation to execute based on the first argument
switch (args[0]) {
  case "add":
    // Execute the addition if 'add' is the first argument and pass the next two arguments as numbers
    console.log(add(args[1], args[2]));
    break;

  case "sub":
    // Execute the subtraction if 'sub' is the first argument and pass the next two arguments
    console.log(sub(args[1], args[2]));
    break;

  case "mult":
    // Execute the multiplication if 'mult' is the first argument and pass the next two arguments
    console.log(mult(args[1], args[2]));
    break;

  case "div":
    // Execute the division if 'div' is the first argument and pass the next two arguments
    console.log(div(args[1], args[2]));
    break;

  case "sine":
    // Execute the sine function if 'sine' is the first argument, passing the next argument as the angle in radians
    console.log(sine(args[1]));
    break;

  case "cosine":
    // Execute the cosine function if 'cosine' is the first argument, passing the next argument as the angle in radians
    console.log(cosine(args[1]));
    break;

  case "tan":
    // Execute the tangent function if 'tan' is the first argument, passing the next argument as the angle in radians
    console.log(tan(args[1]));
    break;

  case "random":
    // Execute the random byte generator if 'random' is the first argument
    if (!args[1]) {
      console.log("Please provide length for random number generation!"); // Error if length is not provided
      break;
    }
    random(args[1]); // Pass the length to the random function
    break;

  default:
    // Handle invalid or unrecognized commands
    console.log("Invalid command");
    break;
}

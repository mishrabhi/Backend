const crypto = require("crypto");
const os = require("os");

const algorithm = "aes-256-cbc";
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

//Encrypt
const encrypt = (text) => {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  return encrypted;
};

//Decrypt
const decrypt = (text) => {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(text, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};

const encrypted = encrypt("Hello, Good Morning");
console.log(encrypted);
console.log(decrypt(encrypted));

// Function to print OS details
function printOSDetails() {
  console.log("OS Details:");
  console.log("Platform: ", os.platform());
  console.log("CPU Architecture: ", os.arch());
  console.log("Total Memory: ", os.totalmem());
  console.log("Free Memory: ", os.freemem());
  console.log("Home Directory: ", os.homedir());
  console.log("Uptime: ", os.uptime(), " seconds");
}

printOSDetails();

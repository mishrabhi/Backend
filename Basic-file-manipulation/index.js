const fs = require("fs");
const path = require("path");

//Retrieve command line arguments
// const args = process.argv.slice(2);
const operation = process.argv[2];
const file = process.argv[3];
const content = process.argv[4];

switch (operation) {
  //Read file
  case "read":
    fs.readFile(file, "utf8", (error, data) => {
      if (error) {
        console.log(`Error reading file: ${error.message}`);
      } else {
        console.log(`Content of the file "${file}":\n${data}`);
      }
    });
    break;

  //Create File
  case "create":
    fs.writeFile(file, "", (error) => {
      if (error) {
        console.log(`Error creating file: ${error.message}`);
      } else {
        console.log(`File "${file}" created`);
      }
    });
    break;

  //Delete File
  case "delete":
    fs.unlink(file, (error) => {
      if (error) {
        console.log(`Error deleting file: ${error.message}`);
      } else {
        console.log(`File "${file}" deleted.`);
      }
    });
    break;

  //Append File
  case "append":
    fs.appendFile(file, `\n ${content}`, (error) => {
      if (error) {
        console.log(`Error appending content: ${error.message}`);
      } else {
        console.log(`Content appended to file "${file}"`);
      }
    });
    break;

  //Rename File
  case "rename":
    const newFileName = content;
    fs.rename(file, newFileName, (error) => {
      if (error) {
        console.log(`Error renaming file: ${error.message}`);
      } else {
        console.log(`File "${file}" renamed to "${newFileName}"`);
      }
    });
    break;

  //List Files
  case "list":
    fs.readdir(".", (error, files) => {
      if (error) {
        console.log(`Error listing files: ${error.message}`);
      } else {
        console.log("List of all file and directories:");
        files.forEach((file) => console.log(file));
      }
    });
    break;

  default:
    console.log(`Invalid Operation '${operation}'`);
}

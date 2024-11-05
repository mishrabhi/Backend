const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

//uploads directory
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

//Saving files locally using multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  fileName: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.orinalname);
  },
});

const upload = multer({ storage: storage });

//HTML form for file upload
app.get("/", (req, res) => {
  res.send(`
    <form action="/upload" method="post" enctype="multipart/form-data">
      <input type="file" name="file"/>
      <button type= "submit">Upload File </button>
      </form>
    `);
});

//File upload using post req and saving locally
app.post("/upload", upload.single("file"), (req, res) => {
  res.status(200).json({
    message: "File uploaded successfully!",
    filePath: `/uploads/${req.file.filename}`,
  });
});

//Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(3000, () => {
  console.log("Server is up and running on port 3000");
});

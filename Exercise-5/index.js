const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
const ROUTES = require("./routes/buddy.routes");
require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
  })
);

app.use("/buddy", ROUTES);

app.listen(process.env.PORT, () => {
  fs.writeFile("./cdw_ace23_buddies.json", "[]", (err) => {
    if (err) console.log("file not created");
  });
  console.log(`File created and Server is running on port: ${process.env.PORT}`);
});

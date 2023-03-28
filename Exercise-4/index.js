const express = require("express");
const app = express();
const fs = require("fs");
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const CREATE_ROUTE = require("./routes/create");
app.use("/create", CREATE_ROUTE);

const READ_ROUTE = require("./routes/read");
app.use("/read", READ_ROUTE);

const UPDATE_ROUTE = require("./routes/update");
app.use("/update", UPDATE_ROUTE);

const DELETE_ROUTE = require("./routes/delete");
app.use("/delete", DELETE_ROUTE);

app.use("/createFile", (req, res) => {
  
});

app.listen(PORT, () => {
  fs.writeFile("./cdw_ace23_buddies.json", "[]", (err) => {
    if (err) console.log("file not created");
  });
  console.log(`File created and Server is running on port: ${PORT}`);
});

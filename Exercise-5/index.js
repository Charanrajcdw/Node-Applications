const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
  })
);

const CREATE_ROUTE = require("./routes/create.routes");
app.use("/create", CREATE_ROUTE);

const READ_ROUTE = require("./routes/read.routes");
app.use("/read", READ_ROUTE);

const UPDATE_ROUTE = require("./routes/update.routes");
app.use("/update", UPDATE_ROUTE);

const DELETE_ROUTE = require("./routes/delete.routes");
app.use("/delete", DELETE_ROUTE);

app.listen(PORT, () => {
  fs.writeFile("./cdw_ace23_buddies.json", "[]", (err) => {
    if (err) console.log("file not created");
  });
  console.log(`File created and Server is running on port: ${PORT}`);
});

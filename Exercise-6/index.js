const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const ROUTES = require("./routes/tasks.routes");
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/tasks", ROUTES);

app.listen(PORT, () => {
  fs.writeFile("./user_data.json", "[]", (err) => {
    if (err) console.log("file not created");
  });
  console.log(`File created and Server is running on port: ${PORT}`);
});

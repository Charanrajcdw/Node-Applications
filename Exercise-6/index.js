const express = require("express");
const app = express();
const cors = require("cors");
const ROUTES = require("./routes/tasks.routes");
const LOGGER = require("../utils/logger.utils");
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/tasks", ROUTES);

app.listen(PORT, () => {
  LOGGER.info(`File created and Server is running on port: ${PORT}`);
});

const express = require("express");
const app = express();
const cors = require("cors");
const TASK_ROUTES = require("./routes/tasksRoutes");
const USER_ROUTES = require("./routes/userRoutes");
const LOGGER = require("./utils/loggerUtils");
const PORT = 4000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/tasks", TASK_ROUTES);
app.use("/users", USER_ROUTES);

app.listen(PORT, () => {
  // LOGGER.info(`Server started and running on port: ${PORT}`);
});

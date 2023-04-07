const isPresent = (field) => {
  if (!field || field.length === 0) return false;
  return true;
};

const isDefinedAndPresent = (field) => {
  if (field !== undefined && field.length === 0) return false;
  return true;
};

const userValidation = (req) => {
  if (!req.body) return false;
  const { username, password } = req.body;
  return isPresent(username) && isPresent(password);
};

const addTaskValidation = (req) => {
  if (!req.body) return false;
  const { title, description, dueDate, comments, priority } = req.body;
  return isPresent(title) && isPresent(description) && isPresent(dueDate) && isPresent(comments) && isPresent(priority);
};

const updateTaskValidation = (req) => {
  if (!req.body) return false;
  const { title, description, dueDate, comments, priority } = req.body;
  return (
    isDefinedAndPresent(title) &&
    isDefinedAndPresent(description) &&
    isDefinedAndPresent(dueDate) &&
    isDefinedAndPresent(comments) &&
    isDefinedAndPresent(priority)
  );
};

module.exports = {
  userValidation,
  addTaskValidation,
  updateTaskValidation,
};

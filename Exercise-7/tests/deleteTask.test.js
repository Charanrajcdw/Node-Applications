const axios = require("axios");
const URL = "http://localhost:4000/tasks/";

describe.skip("Deleting Task", () => {
  test("Deleting specific task with no token", async () => {
    await axios({
      method: "delete",
      url: URL + "/44",
      headers: {},
    }).catch((err) => {
      expect(err.response.data).toEqual({ message: "Unable to delete task!!! Please, login again!!!" });
    });
  });
  test("Deleting missing task", async () => {
    await axios({
      method: "delete",
      url: URL + "/0",
      headers: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNoYXJhbnJhaiIsImlhdCI6MTY4MDc4NzUxOH0.CBwxtIQKqja2P04jG2Kr3pCAVdr3VXJz8j-q5wkdAKE",
      },
    }).catch((err) => {
      expect(err.response.data).toEqual({ data: "Task not found!!!" });
    });
  });
  test("Deleting specific task with invalid id", async () => {
    await axios({
      method: "delete",
      url: URL + "/hello",
      headers: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNoYXJhbnJhaiIsImlhdCI6MTY4MDc4NzUxOH0.CBwxtIQKqja2P04jG2Kr3pCAVdr3VXJz8j-q5wkdAKE",
      },
    }).catch((err) => {
      expect(err.response.data).toEqual({ code: 400, data: "INVALID REQUEST!!!" });
    });
  });
  test("Deleting specific task", async () => {
    await axios({
      method: "delete",
      url: URL + "/43",
      headers: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNoYXJhbnJhaiIsImlhdCI6MTY4MDc4NzUxOH0.CBwxtIQKqja2P04jG2Kr3pCAVdr3VXJz8j-q5wkdAKE",
      },
    }).catch((err) => {
      expect(err.response.data).toEqual({ code: 400, data: "INVALID REQUEST!!!" });
    });
  });
});

const axios = require("axios");
const URL = "http://localhost:4000/tasks/";

describe.skip("Reading Task", () => {
  test("Reading task with no token", async () => {
    await axios({
      method: "get",
      url: URL,
      headers: {},
    }).catch((err) => {
      expect(err.response.data).toEqual({ message: "Unable to read task!!! Please, login again!!!" });
    });
  });
  test("Reading specific task with no token", async () => {
    await axios({
      method: "get",
      url: URL + "/1",
      headers: {},
    }).catch((err) => {
      expect(err.response.data).toEqual({ message: "Unable to read task!!! Please, login again!!!" });
    });
  });
  test("Reading missing task", async () => {
    await axios({
      method: "get",
      url: URL + "/0",
      headers: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNoYXJhbnJhaiIsImlhdCI6MTY4MDc4NzUxOH0.CBwxtIQKqja2P04jG2Kr3pCAVdr3VXJz8j-q5wkdAKE",
      },
    }).catch((err) => {
      expect(err.response.data).toEqual({ data: "Task not found!!!" });
    });
  });
  test("Reading specific task with invalid id", async () => {
    await axios({
      method: "get",
      url: URL + "/hello",
      headers: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNoYXJhbnJhaiIsImlhdCI6MTY4MDc4NzUxOH0.CBwxtIQKqja2P04jG2Kr3pCAVdr3VXJz8j-q5wkdAKE",
      },
    }).catch((err) => {
      expect(err.response.data).toEqual({ code: 400, data: "INVALID REQUEST!!!" });
    });
  });
});

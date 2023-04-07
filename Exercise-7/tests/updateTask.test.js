const axios = require("axios");
const URL = "http://localhost:4000/tasks/";

describe("Updating Task", () => {
  test("Updating specific task with no token", async () => {
    await axios({
      method: "put",
      url: URL + "/1",
      headers: {},
      body: {
        title: "task 1",
        description: "task 1 description",
      },
    }).catch((err) => {
      expect(err.response.data).toEqual({ message: "Unable to update task!!! Please, login again!!!" });
    });
  });
  test("Updating missing task", async () => {
    await axios({
      method: "put",
      url: URL + "/0",
      headers: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNoYXJhbnJhaiIsImlhdCI6MTY4MDc4NzUxOH0.CBwxtIQKqja2P04jG2Kr3pCAVdr3VXJz8j-q5wkdAKE",
      },
      body: {
        title: "task 1",
        description: "task 1 description",
      },
    }).catch((err) => {
      expect(err.response.data).toEqual({ data: "Task not found!!!" });
    });
  });
  test("Updating specific task with invalid id", async () => {
    await axios({
      method: "put",
      url: URL + "/hello",
      headers: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNoYXJhbnJhaiIsImlhdCI6MTY4MDc4NzUxOH0.CBwxtIQKqja2P04jG2Kr3pCAVdr3VXJz8j-q5wkdAKE",
      },
      body: {
        title: "task 1",
        description: "task 1 description",
      },
    }).catch((err) => {
      expect(err.response.data).toEqual({ code: 400, data: "INVALID REQUEST!!!" });
    });
  });
  test("Updating task with empty values", async () => {
    let res = await axios({
      method: "put",
      url: URL+"/2",
      headers: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNoYXJhbnJhaiIsImlhdCI6MTY4MDc4NzUxOH0.CBwxtIQKqja2P04jG2Kr3pCAVdr3VXJz8j-q5wkdAKE",
      },
      data: {
        title: "",
        description: "",
      },
    }).catch((err) => {
        expect(err.response.data).toEqual({ code: 400, data: "INVALID REQUEST!!!" });
    });
  });
  test("Updating task", async () => {
    let res = await axios({
      method: "put",
      url: URL+"/2",
      headers: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNoYXJhbnJhaiIsImlhdCI6MTY4MDc4NzUxOH0.CBwxtIQKqja2P04jG2Kr3pCAVdr3VXJz8j-q5wkdAKE",
      },
      data: {
        title: "task 2",
        description: "task 2 description",
      },
    }).catch((err) => {
      console.log(err);
    });
    expect(res.data).toEqual({ data: "Task Updated Successfully!!!" });
  });
});

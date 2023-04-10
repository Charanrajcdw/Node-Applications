const axios = require("axios");
const URL = "http://localhost:4000/tasks/";
const sinon = require("sinon");
const AUTH =require("../utils/authUtils")

describe.skip("Adding Task", () => {
  test("Adding task with no token", async () => {
    await axios({
      method: "post",
      url: URL,
      headers: {},
      data: {
        title: "task 4",
        description: "task 4 description",
        priority: "high",
        dueDate: "2023-04-10",
        comments: "['comment 1','comment2']",
      },
    }).catch((err) => {
      expect(err.response.data).toEqual({ message: "Unable to add task!!! Please, login again!!!" });
    });
  });
  test("Adding task with no body", async () => {
    await axios({
      method: "post",
      url: URL,
      headers: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNoYXJhbnJhaiIsImlhdCI6MTY4MDc4NzUxOH0.CBwxtIQKqja2P04jG2Kr3pCAVdr3VXJz8j-q5wkdAKE",
      },
      data: {},
    }).catch((err) => {
      expect(err.response.data).toEqual({ code: 400, data: "INVALID REQUEST!!!" });
    });
  });
  test("Adding task with missing fields", async () => {
    await axios({
      method: "post",
      url: URL,
      headers: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNoYXJhbnJhaiIsImlhdCI6MTY4MDc4NzUxOH0.CBwxtIQKqja2P04jG2Kr3pCAVdr3VXJz8j-q5wkdAKE",
      },
      data: {
        title: "title",
        description: "description",
      },
    }).catch((err) => {
      expect(err.response.data).toEqual({ code: 400, data: "INVALID REQUEST!!!" });
    });
  });
  test("Adding task with missing values", async () => {
    await axios({
      method: "post",
      url: URL,
      headers: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNoYXJhbnJhaiIsImlhdCI6MTY4MDc4NzUxOH0.CBwxtIQKqja2P04jG2Kr3pCAVdr3VXJz8j-q5wkdAKE",
      },
      data: {
        title: "",
        description: "",
        priority: "high",
        dueDate: "2023-04-10",
        comments: "['comment 1','comment2']",
      },
    }).catch((err) => {
      expect(err.response.data).toEqual({ code: 400, data: "INVALID REQUEST!!!" });
    });
  });
  test("Adding task", async () => {
    let res = await axios({
      method: "post",
      url: URL,
      headers: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNoYXJhbnJhaiIsImlhdCI6MTY4MDc4NzUxOH0.CBwxtIQKqja2P04jG2Kr3pCAVdr3VXJz8j-q5wkdAKE",
      },
      data: {
        title: "task 4",
        description: "task 4 description",
        priority: "high",
        dueDate: "2023-04-10",
        comments: "['comment 1','comment2']",
      },
    });
    expect(res.data).toEqual({ data: "Task Added Successfully!!!" });
  });
});

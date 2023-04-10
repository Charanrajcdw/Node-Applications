const axios = require("axios");
const URL = "http://localhost:4000/tasks/";
const sinon = require("sinon");
const FILE_UTILS = require("../utils/fileUtils");
const TASK_SERVICES = require("../services/tasksServices");

let readData = [
  {
    username: "charan",
    tasks: [
      {
        title: "title",
        description: "description",
        dueDate: "2023-10-10",
        priority: "medium",
        comments: "[]",
        createdDate: "2023-04-10T05:35:39.428Z",
        id: 1,
      },
      {
        title: "title2",
        description: "description",
        dueDate: "2023-10-10",
        priority: "medium",
        comments: "[]",
        createdDate: "2023-04-10T05:40:31.832Z",
        id: 2,
      },
    ],
    lastElementId: 2,
  },
];

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
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNoYXJhbiIsImlhdCI6MTY4MTEwNDkxMH0.tqQBrvDIrrzzSjwNwJKF2qtoHAJHFXlsz9WeW7ygCq8",
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
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNoYXJhbiIsImlhdCI6MTY4MTEwNDkxMH0.tqQBrvDIrrzzSjwNwJKF2qtoHAJHFXlsz9WeW7ygCq8",
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
      url: URL + "/2",
      headers: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNoYXJhbiIsImlhdCI6MTY4MTEwNDkxMH0.tqQBrvDIrrzzSjwNwJKF2qtoHAJHFXlsz9WeW7ygCq8",
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
    let fileStub = sinon.stub(FILE_UTILS);
    fileStub.readFile.returns(Promise.resolve(readData));
    fileStub.writeFile.returns(Promise.resolve("Data written!"));
    let taskData = {
      title: "title3",
      description: "description",
      dueDate: "2023-10-10",
      priority: "medium",
      comments: "[]",
    };
    let res = await TASK_SERVICES.updateTaskService("charan", 2, taskData);
    expect(res).toEqual({ data: true, status: true });
    fileStub.readFile.restore();
    fileStub.writeFile.restore();
  });
});

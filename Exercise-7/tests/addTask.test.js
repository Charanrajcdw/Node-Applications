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

describe("Adding Task", () => {
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
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNoYXJhbiIsImlhdCI6MTY4MTEwNDkxMH0.tqQBrvDIrrzzSjwNwJKF2qtoHAJHFXlsz9WeW7ygCq8",
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
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNoYXJhbiIsImlhdCI6MTY4MTEwNDkxMH0.tqQBrvDIrrzzSjwNwJKF2qtoHAJHFXlsz9WeW7ygCq8",
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
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNoYXJhbiIsImlhdCI6MTY4MTEwNDkxMH0.tqQBrvDIrrzzSjwNwJKF2qtoHAJHFXlsz9WeW7ygCq8",
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
    let res = await TASK_SERVICES.addTaskService("charan", taskData);
    expect(res).toEqual({ data: "Task Added Successfully!!!", status: true });
    fileStub.readFile.restore();
    fileStub.writeFile.restore();
  });
});

const axios = require("axios");
const URL = "http://localhost:4000/tasks/";
const FILE_UTILS = require("../utils/fileUtils");
const TASK_SERVICES = require("../services/tasksServices");
const sinon = require("sinon");

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

describe("Reading Task", () => {
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
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNoYXJhbiIsImlhdCI6MTY4MTEwNDkxMH0.tqQBrvDIrrzzSjwNwJKF2qtoHAJHFXlsz9WeW7ygCq8",
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
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNoYXJhbiIsImlhdCI6MTY4MTEwNDkxMH0.tqQBrvDIrrzzSjwNwJKF2qtoHAJHFXlsz9WeW7ygCq8",
      },
    }).catch((err) => {
      expect(err.response.data).toEqual({ code: 400, data: "INVALID REQUEST!!!" });
    });
  });
  test("Reading all tasks", async () => {
    let fileStub = sinon.stub(FILE_UTILS);
    fileStub.readFile.returns(Promise.resolve(readData));
    let res = await TASK_SERVICES.readAllTasksService("charan");
    expect(res.data).toBe(readData[0].tasks);
    fileStub.readFile.restore();
    fileStub.writeFile.restore();
  });
  test("Reading specific task with id", async () => {
    let fileStub = sinon.stub(FILE_UTILS);
    fileStub.readFile.returns(Promise.resolve(readData));
    let res = await TASK_SERVICES.readTaskService("charan",1);
    expect(res.data).toBe(readData[0].tasks.find(task=>task.id===1));
    fileStub.readFile.restore();
    fileStub.writeFile.restore();
  });
});

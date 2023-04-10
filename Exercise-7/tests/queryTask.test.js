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
        title: "title2",
        description: "description",
        dueDate: "2023-10-12",
        priority: "high",
        comments: "[]",
        createdDate: "2023-04-10T05:35:39.428Z",
        id: 1,
      },
      {
        title: "title1",
        description: "description",
        dueDate: "2023-10-10",
        priority: "low",
        comments: "[]",
        createdDate: "2023-04-10T05:40:31.832Z",
        id: 2,
      },
      {
        title: "title3",
        description: "description",
        dueDate: "2023-10-11",
        priority: "medium",
        comments: "[]",
        createdDate: "2023-04-10T05:40:31.832Z",
        id: 3,
      },
    ],
    lastElementId: 3,
  },
];

describe.skip("Sorting, Filtering & Paginating Tasks", () => {
  test("Invalid sort value", async () => {
    await axios({
      method: "get",
      url: URL,
      headers: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNoYXJhbiIsImlhdCI6MTY4MTEwNDkxMH0.tqQBrvDIrrzzSjwNwJKF2qtoHAJHFXlsz9WeW7ygCq8",
      },
      params: {
        sortValue: "custom",
      },
    }).catch((err) => {
      expect(err.response.data).toEqual({ message: "Invalid sort request!!!" });
    });
  });
  test("Page number and limit as 0", async () => {
    await axios({
      method: "get",
      url: URL,
      headers: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNoYXJhbiIsImlhdCI6MTY4MTEwNDkxMH0.tqQBrvDIrrzzSjwNwJKF2qtoHAJHFXlsz9WeW7ygCq8",
      },
      params: {
        page: 0,
        limit: 0,
      },
    }).catch((err) => {
      expect(err.response.data).toEqual({ message: "Invalid page request!!!" });
    });
  });
  test("Exceeded page number and limit", async () => {
    await axios({
      method: "get",
      url: URL,
      headers: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNoYXJhbiIsImlhdCI6MTY4MTEwNDkxMH0.tqQBrvDIrrzzSjwNwJKF2qtoHAJHFXlsz9WeW7ygCq8",
      },
      params: {
        page: 50,
        limit: 1000,
      },
    }).catch((err) => {
      expect(err.response.data).toEqual({ message: "Invalid page request!!!" });
    });
  });
  test("Invalid page number and limit", async () => {
    await axios({
      method: "get",
      url: URL,
      headers: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNoYXJhbiIsImlhdCI6MTY4MTEwNDkxMH0.tqQBrvDIrrzzSjwNwJKF2qtoHAJHFXlsz9WeW7ygCq8",
      },
      params: {
        page: "hello",
        limit: "hello",
      },
    }).catch((err) => {
      expect(err.response.data).toEqual({ message: "Invalid page request!!!" });
    });
  });
});

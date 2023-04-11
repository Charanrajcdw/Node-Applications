const axios = require("axios");
const URL = "http://localhost:4000/tasks/";
const TASK_SERVICES = require("../services/tasksServices");

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

describe("Sorting Tasks", () => {
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
  test("Sorting all tasks by title", async () => {
    let res = await TASK_SERVICES.sortTasksService(readData[0].tasks, "title");
    expect(JSON.stringify(res)).toBe(
      JSON.stringify([
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
          title: "title2",
          description: "description",
          dueDate: "2023-10-12",
          priority: "high",
          comments: "[]",
          createdDate: "2023-04-10T05:35:39.428Z",
          id: 1,
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
      ])
    );
  });
  test("Sorting all tasks by priority", async () => {
    let res = await TASK_SERVICES.sortTasksService(readData[0].tasks, "priority");
    expect(JSON.stringify(res)).toBe(
      JSON.stringify([
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
          title: "title3",
          description: "description",
          dueDate: "2023-10-11",
          priority: "medium",
          comments: "[]",
          createdDate: "2023-04-10T05:40:31.832Z",
          id: 3,
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
      ])
    );
  });
  test("Sorting all tasks by dueDate", async () => {
    let res = await TASK_SERVICES.sortTasksService(readData[0].tasks, "dueDate");
    expect(JSON.stringify(res)).toBe(
      JSON.stringify([
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
        {
          title: "title2",
          description: "description",
          dueDate: "2023-10-12",
          priority: "high",
          comments: "[]",
          createdDate: "2023-04-10T05:35:39.428Z",
          id: 1,
        },
      ])
    );
  });
});

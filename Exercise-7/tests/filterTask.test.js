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

describe("Filtering Tasks", () => {
  test("Filtering all tasks by title", async () => {
    let res = await TASK_SERVICES.filterTasksService(readData[0].tasks, "title1", null, null);
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
      ])
    );
  });
  test("Filtering all tasks by priority", async () => {
    let res = await TASK_SERVICES.filterTasksService(readData[0].tasks, null, "low", null);
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
      ])
    );
  });
  test("Filtering all tasks by dueDate", async () => {
    let res = await TASK_SERVICES.filterTasksService(readData[0].tasks, null, null, "2023-10-15");
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
      ])
    );
  });
});

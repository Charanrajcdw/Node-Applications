const axios = require("axios");
const URL = "http://localhost:4000/tasks/";

describe.skip("Sorting, Filtering & Paginating Tasks", () => {
  test("Invalid sort value", async () => {
    await axios({
      method: "get",
      url: URL,
      headers: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNoYXJhbnJhaiIsImlhdCI6MTY4MDc4NzUxOH0.CBwxtIQKqja2P04jG2Kr3pCAVdr3VXJz8j-q5wkdAKE",
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
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNoYXJhbnJhaiIsImlhdCI6MTY4MDc4NzUxOH0.CBwxtIQKqja2P04jG2Kr3pCAVdr3VXJz8j-q5wkdAKE",
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
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNoYXJhbnJhaiIsImlhdCI6MTY4MDc4NzUxOH0.CBwxtIQKqja2P04jG2Kr3pCAVdr3VXJz8j-q5wkdAKE",
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
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNoYXJhbnJhaiIsImlhdCI6MTY4MDc4NzUxOH0.CBwxtIQKqja2P04jG2Kr3pCAVdr3VXJz8j-q5wkdAKE",
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

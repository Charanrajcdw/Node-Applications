const USER_SERVICE = require("../services/userServices");
const axios = require("axios");
const URL = "http://localhost:4000/users/";

describe("Register User", () => {
  test("Registering user with no body", async () => {
    await axios({
      method: "post",
      url: URL + "/register",
      headers: {},
      data: {},
    }).catch((err) => {
      expect(err.response.data).toEqual({ code: 400, message: "INVALID REQUEST!!!" });
    });
  });
  test("Registering user with no username", async () => {
    await axios({
      method: "post",
      url: URL + "/register",
      headers: {},
      data: { password: "pass" },
    }).catch((err) => {
      expect(err.response.data).toEqual({ code: 400, message: "INVALID REQUEST!!!" });
    });
  });
  test("Registering user with no password", async () => {
    await axios({
      method: "post",
      url: URL + "/register",
      headers: {},
      data: { username: "charan" },
    }).catch((err) => {
      expect(err.response.data).toEqual({ code: 400, message: "INVALID REQUEST!!!" });
    });
  });
  test("Registering user with no username value", async () => {
    await axios({
      method: "post",
      url: URL + "/register",
      headers: {},
      data: { username: "", password: "pass" },
    }).catch((err) => {
      expect(err.response.data).toEqual({ code: 400, message: "INVALID REQUEST!!!" });
    });
  });
  test("Registering user with no password value", async () => {
    await axios({
      method: "post",
      url: URL + "/register",
      headers: {},
      data: { username: "charan", password: "" },
    }).catch((err) => {
      expect(err.response.data).toEqual({ code: 400, message: "INVALID REQUEST!!!" });
    });
  });
  test("Registering existing user", async () => {
    await axios({
      method: "post",
      url: URL + "/register",
      headers: {},
      data: { username: "raj", password: "password" },
    }).catch((err) => {
      expect(err.response.data).toEqual({ message: "User already exists!!!" });
    });
  });
});

describe("Login User", () => {
  test("Logging in user with no body", async () => {
    await axios({
      method: "post",
      url: URL + "/login",
      headers: {},
      data: {},
    }).catch((err) => {
      expect(err.response.data).toEqual({ code: 400, message: "INVALID REQUEST!!!" });
    });
  });
  test("Logging in user with no username", async () => {
    await axios({
      method: "post",
      url: URL + "/login",
      headers: {},
      data: { password: "pass" },
    }).catch((err) => {
      expect(err.response.data).toEqual({ code: 400, message: "INVALID REQUEST!!!" });
    });
  });
  test("Logging in user with no password", async () => {
    await axios({
      method: "post",
      url: URL + "/login",
      headers: {},
      data: { username: "charan" },
    }).catch((err) => {
      expect(err.response.data).toEqual({ code: 400, message: "INVALID REQUEST!!!" });
    });
  });
  test("Logging in user with no username value", async () => {
    await axios({
      method: "post",
      url: URL + "/login",
      headers: {},
      data: { username: "", password: "pass" },
    }).catch((err) => {
      expect(err.response.data).toEqual({ code: 400, message: "INVALID REQUEST!!!" });
    });
  });
  test("Logging in user with no password value", async () => {
    await axios({
      method: "post",
      url: URL + "/login",
      headers: {},
      data: { username: "charan", password: "" },
    }).catch((err) => {
      expect(err.response.data).toEqual({ code: 400, message: "INVALID REQUEST!!!" });
    });
  });
  test("Logging in with wrong password", async () => {
    await axios({
      method: "post",
      url: URL + "/login",
      headers: {},
      data: { username: "charanraj", password: "raj" },
    }).catch((err) => {
      expect(err.response.data).toEqual({ message: "Password is invalid!!!" });
    });
  });
  test("Logging in with new user", async () => {
    await axios({
      method: "post",
      url: URL + "/login",
      headers: {},
      data: { username: "raj", password: "raj" },
    }).catch((err) => {
      expect(err.response.data).toEqual({ message: "User not exists!!!" });
    });
  });
});

const axios = require("axios");
const URL = "http://localhost:4000/users/";
const AUTH_UTILS = require("../utils/authUtils");
const FILE_UTILS = require("../utils/fileUtils");
const USER_SERVICES = require("../services/userServices");
const sinon = require("sinon");

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
      data: { username: "charan", password: "password" },
    }).catch((err) => {
      expect(err.response.data).toEqual({ message: "User already exists!!!" });
    });
  });
  test("Registering new user", async () => {
    let authStub = sinon.stub(AUTH_UTILS, "getToken");
    let fileStub = sinon.stub(FILE_UTILS);
    fileStub.readFile.returns(Promise.resolve([]));
    fileStub.writeFile.returns(Promise.resolve("Data written!"));
    authStub.returns("abcdefgh");
    let res = await USER_SERVICES.registerUserService({
      username: "raj",
      password: "raj",
    });
    expect(res).toEqual({ message: "User Registered Successfully!!!", token: "abcdefgh", status: true });
    authStub.restore();
    fileStub.readFile.restore();
    fileStub.writeFile.restore();
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
      data: { username: "charan", password: "raj" },
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
  test("Logging in with existing user", async () => {
    let authStub = sinon.stub(AUTH_UTILS, "getToken");
    let fileStub = sinon.stub(FILE_UTILS);
    fileStub.readFile.returns(Promise.resolve([{ username: "charan", password: "$2b$10$UKDzp/KkgRpY.u4g0fqGc.1HhdxkDHHix/fR2TLyZWDahMCojVP4C" }]));
    authStub.returns("abcdefgh");
    let res= await USER_SERVICES.loginUserService({
      username: "charan",
      password: "raj",
    });
    expect(res).toEqual({ message: "User logged in successfully!!!", token: "abcdefgh", status: true });
    authStub.restore();
    fileStub.readFile.restore();
    fileStub.writeFile.restore();
  });
});

const BUDDY_SERVICE = require("../services/buddy.service");
const LOGGER = require("../utils/logger.utils");

const addBuddy = async (req, res) => {
  LOGGER.info(`IP:${req.ip}, URL:${req.originalUrl}`);
  const BUDDY_DATA = req.body;
  const RESPONSE = await BUDDY_SERVICE.addBuddyService(BUDDY_DATA);
  if (RESPONSE.status) {
    res.status(200);
  } else {
    res.status(500);
    LOGGER.error(`IP:${req.ip}, URL:${req.originalUrl}, STATUS:${RESPONSE.code}, MESSAGE:${RESPONSE.data}`);
  }
  res.send(RESPONSE.data);
};

const readBuddy = async (req, res) => {
  LOGGER.info(`IP:${req.ip}, URL:${req.originalUrl}`);
  const BUDDY_ID = req.params.id;
  const RESPONSE = await BUDDY_SERVICE.readBuddyService(BUDDY_ID);
  if (RESPONSE.status) {
    if (RESPONSE.data) {
      res.status(200).send(RESPONSE.data);
    } else {
      res.status(404).send("BUDDY NOT FOUND!!!");
    }
  } else {
    LOGGER.error(`IP:${req.ip}, URL:${req.originalUrl}, STATUS:${RESPONSE.code}, MESSAGE:${RESPONSE.data}`);
    res.status(500).send(RESPONSE.data);
  }
};

const readAllBuddies = async (req, res) => {
  LOGGER.info(`IP:${req.ip}, URL:${req.originalUrl}`);
  const RESPONSE = await BUDDY_SERVICE.readAllBuddiesService();
  if (RESPONSE.status) {
    res.status(200);
  } else {
    LOGGER.error(`IP:${req.ip}, URL:${req.originalUrl}, STATUS:${RESPONSE.code}, MESSAGE:${RESPONSE.data}`);
    res.status(500);
  }
  res.send(RESPONSE.data);
};

const updateBuddy = async (req, res) => {
  LOGGER.info(`IP:${req.ip}, URL:${req.originalUrl}`);
  const BUDDY_DATA = req.body;
  const BUDDY_ID = req.params.id;
  const RESPONSE = await BUDDY_SERVICE.updateBuddyService(BUDDY_DATA, BUDDY_ID);
  if (RESPONSE.status) {
    if (RESPONSE.data !== -1) {
      res.status(200).send("Buddy Updated Successfully!!!");
    } else {
      res.status(404).send("BUDDY NOT FOUND!!!");
    }
  } else {
    LOGGER.error(`IP:${req.ip}, URL:${req.originalUrl}, STATUS:${RESPONSE.code}, MESSAGE:${RESPONSE.data}`);
    res.status(500).send(RESPONSE.data);
  }
};

const deleteBuddy = async (req, res) => {
  LOGGER.info(`IP:${req.ip}, URL:${req.originalUrl}`);
  const BUDDY_ID = req.params.id;
  const RESPONSE = await BUDDY_SERVICE.deleteBuddyService(BUDDY_ID);
  if (RESPONSE.status) {
    if (RESPONSE.data !== -1) {
      res.status(200).send("Buddy Deleted Successfully!!!");
    } else {
      res.status(404).send("BUDDY NOT FOUND!!!");
    }
  } else {
    LOGGER.error(`IP:${req.ip}, URL:${req.originalUrl}, STATUS:${RESPONSE.code}, MESSAGE:${RESPONSE.data}`);
    res.status(500).send(RESPONSE.data);
  }
};

module.exports = { addBuddy, readBuddy, readAllBuddies, updateBuddy, deleteBuddy };

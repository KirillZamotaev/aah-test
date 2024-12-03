const express = require("express");

const router = express.Router();
const meetingController = require("./meeting");

router.post("/add", meetingController.add);
router.get("/list", meetingController.index);
router.get("/view/:id", meetingController.view);
router.delete("/delete/:id", meetingController.deleteData);
router.delete("/deleteMany", meetingController.deleteMany);

module.exports = router;

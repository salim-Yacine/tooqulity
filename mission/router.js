const { createMission, getMission, getById, updateMission, deleteMission } = require("./controler");

const router = require("express").Router();

router.post("/", createMission);
router.get("/", getMission);
router.get("/:id", getById);
router.put("/", updateMission);
router.delete("/:duty_id");

module.exports = router;
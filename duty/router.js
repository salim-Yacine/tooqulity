const { createDuty, getduty, getDutyById, updateDutys, deleteDutys, dutyStatus, selectUser, createToduLists, dutyDate } = require("./controler");

const router = require("express").Router();

router.post("/", createDuty);
router.get("/", getduty);
router.get("/:id", getDutyById);
router.put("/", updateDutys);
router.put("/status", dutyStatus);
router.put("/createToduList", createToduLists);
router.put("/dutyDate", dutyDate);
router.delete("/:id", deleteDutys);

module.exports = router;

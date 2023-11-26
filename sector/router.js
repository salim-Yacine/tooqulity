const { createSector, getAll, getSectors, updateSectors, deleteSectors } = require("./controler");

const router = require("express").Router();
//const validator = require('./validation');

router.post("/", createSector);
router.get("/", getAll);
router.get("/:id", getSectors);
router.put("/", updateSectors);
router.delete("/:id", deleteSectors);

module.exports = router;
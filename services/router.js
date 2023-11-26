const { createService, getService, getServices, updateServices, deleteServices } = require("./controler");

const router = require("express").Router();
const validator = require('./validation');

router.post("/", createService);
router.get("/", getServices);
router.get("/:id", getService);
router.put("/", updateServices);
router.delete("/:id", deleteServices);

module.exports = router;
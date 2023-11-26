const { uploadFile, updateFile, getAll, getDoc, deleteFile } = require("./controler");

const upload = require("./storage");

const router = require("express").Router();
const validator = require('./validation');

router.post("/", uploadFile);
router.get("/", getAll);
router.get("/:id", getDoc);
router.put("/", updateFile);
router.put("/doc", upload.single("doc"), uploadFile)
router.put("/document", upload.single("doc"), updateFile);
router.delete("/", deleteFile);

module.exports = router;

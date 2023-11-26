const { getComments, createComment } = require("./controler");

const router = require("express").Router();

router.post("/", createComment);
router.get("/", getComments);

module.exports = router;
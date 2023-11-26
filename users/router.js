const { createUsers, getUsers, getUserById, updateUsers, deleteUsers, login, resetPassword, isuserabonned, resetLink, verifyToken, isUserAutorized, verifyAbonne, token } = require("./controler");
const router = require("express").Router();
//const validator = require('./validation');
//const { checkToken } = require("../auth/token_validation");


router.post("/", createUsers);
router.get("/", getUsers);
router.get("/verify", verifyToken);
router.get("/verifyAbonned", verifyAbonne);
router.get("/:id", getUserById);
router.put("/", updateUsers);
router.put("/isabonne", isuserabonned);
router.put("/autorized", isUserAutorized);
router.delete("/:id", deleteUsers);
router.post("/login", login);
router.put("/password", resetPassword);
router.put("/token", token);
//router.post("/link", resetLink);

module.exports = router;
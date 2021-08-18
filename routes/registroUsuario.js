var express = require ("express");
const router = express.Router();
const controller = require ("../controllers/registroUsuario");
const {upload} = require("../services/uploadImg");


router.post("/", upload.single("avatar"), controller.create);
router.get("/verify/:uid", controller.verify);

module.exports = router;
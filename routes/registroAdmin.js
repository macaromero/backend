var express = require ("express");
const router = express.Router();
const controller = require ("../controllers/registroAdmin");



router.post("/", controller.create);
router.get("/verify/:uid", controller.verify);

module.exports = router;
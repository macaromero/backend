const express = require ("express");
const router = express.Router();
const controller = require ("../../controllers/user/user-usuario");


router.get("/", controller.single);
router.get("/img", controller.getImg);
router.put("/modify/:id", controller.modify);
router.get("/delete/:id", controller.del);

module.exports = router;
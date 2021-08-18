const express = require ("express");
const router = express.Router();
const controller = require ("../../controllers/admin/admin-usuarios");


router.get("/", controller.all);
router.get("/:id", controller.single);
router.get("/enable/:id", controller.enable);
router.get("/delete/:id", controller.del);

module.exports = router;
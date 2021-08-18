const express = require ("express");
const router = express.Router();
const controller = require ("../../controllers/admin/admin-precios");

router.get("/", controller.all);
router.get("/:id", controller.single);
router.post("/new", controller.create);
router.put("/modify/:id", controller.modify);
router.get("/enable/:id", controller.enable);
router.get("/delete/:id", controller.del);

module.exports = router;
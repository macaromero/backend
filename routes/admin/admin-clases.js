const express = require ("express");
const router = express.Router();
const controller = require ("../../controllers/admin/admin-clases");

router.get("/", controller.all);
router.get("/:modalidad", controller.getByModalidad);
router.get("/clase/:id", controller.single);
router.post("/new", controller.create);
router.put("/modify/:id", controller.modify);
router.get("/enable/:id", controller.enable);
router.get("/delete/:id", controller.del);

module.exports = router;
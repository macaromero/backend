const express = require ("express");
const router = express.Router();
const controller = require ("../../controllers/admin/admin-horarios");

router.get("/", controller.all);
router.get("/horas", controller.allHoras);
router.get("/:id", controller.single);
router.post("/new", controller.create);
router.post("/horas/new", controller.createHoras);
router.put("/modify/:id", controller.modify);
router.get("/enable/:id", controller.enable);
router.get("/delete/:id", controller.del);

module.exports = router;
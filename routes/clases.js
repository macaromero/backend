const express = require ("express");
const router = express.Router();
const controller = require ("../controllers/clases");

router.get("/", controller.all);
router.get("/clase/:id", controller.single);
router.get("/:modalidad", controller.getByModalidad);

module.exports = router;
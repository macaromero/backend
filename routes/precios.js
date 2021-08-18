const express = require ("express");
const router = express.Router();
const controller = require ("../controllers/precios");

router.get("/", controller.all);
router.get("/:id", controller.single);

module.exports = router;
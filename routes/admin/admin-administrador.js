const express = require ("express");
const router = express.Router();
const controller = require ("../../controllers/admin/admin-administrador");

router.get("/", controller.single);
router.put("/modify/:id", controller.modify);
router.get("/delete/:id", controller.del);

module.exports = router;
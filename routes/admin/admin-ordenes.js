const express = require ("express");
const router = express.Router();
const controller = require ("../../controllers/admin/admin-ordenes");

router.get("/", controller.all);
router.get("/user/:id", controller.allByUserId);
router.get("/:id", controller.singleOrder);
router.get("/detalles/:id",  controller.singleOrderDetail);

module.exports = router;
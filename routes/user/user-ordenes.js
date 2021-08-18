const express = require ("express");
const router = express.Router();
const controller = require ("../../controllers/user/user-ordenes");

router.get("/", controller.all);
router.get("/:id", controller.singleOrder);
router.get("/detalles/:id",  controller.singleOrderDetail);
router.post("/new", controller.create);
router.get("/enable/:id", controller.enableOrder);
router.put("/modify/:id", controller.modifyOrderDetail);

router.get("/delete/:id", controller.delOrderDetail);

module.exports = router;
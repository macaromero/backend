var express = require ("express");
const router = express.Router();
const controller = require ("../controllers/loginAdmin");



router.post("/", controller.login);

module.exports = router;
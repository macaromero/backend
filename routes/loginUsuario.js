var express = require ("express");
const router = express.Router();
const controller = require ("../controllers/loginUsuario");



router.post("/", controller.login);

module.exports = router;
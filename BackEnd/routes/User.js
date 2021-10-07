const express = require("express");
const router = express.Router();

const userController = require('../controllers/user.controller');
const userMiddlewares = require('../middlewares/middlewares');

router.route('/users').
get(userController.listUsers)


router.route('/registro')
.post(
    userMiddlewares.validarRegistro,
    userController.createUser
)

router.route('/ingreso')
.post(userController.Ingreso)


module.exports = router;
const express = require('express');
const router = express.Router();

const patrocinadoresController = require('../controllers/Patrocinadores');
const userMiddlewares = require('../middlewares/middlewares');

router.route('/patrocinadores')
.get(
    userMiddlewares.isLoggedIn,
    userMiddlewares.isAdmin,
    patrocinadoresController.getAllPatroncinadores
    );

router.route('/patrocinadores/crear')
.post(patrocinadoresController.createPatrocinador)

router.route('/patrocinadores/:id')
.get(patrocinadoresController.getPatroncinador)
.put(patrocinadoresController.updatePatrocinador)
.delete(patrocinadoresController.deletePatrocinador)



module.exports = router;
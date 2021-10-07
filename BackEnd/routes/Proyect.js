const express = require('express');
const router = express.Router();


const proyectControllers = require('../controllers/proyect.controller');


router.route('/')
.get(proyectControllers.createProyect);

module.exports = router;
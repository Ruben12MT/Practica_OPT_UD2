const express = require('express');
const router = express.Router();
const branchController = require('../controllers/branchController');

//Obtener todas las sucursales o filtrar sucursales por parámetros

router.get('/', branchController.getBranchesByProps);
//Crear una sucursal
router.post('/', branchController.createBranch);
//Actualizar una sucursal
router.put('/:id', branchController.updateBranch);
//Borrar una sucursal
router.delete('/:id', branchController.deleteBranch);
//Obtener una sucursal por ID
router.get('/:id', branchController.getBranchById);
module.exports = router;

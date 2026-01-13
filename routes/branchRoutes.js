const express = require('express');
const router = express.Router();
const branchController = require('../controllers/branchController');

//Obtener todas las sucursales
router.get('/', branchController.getAllBranches);
//Obtener una sucursal por ID
router.get('/:id', branchController.getBranchById);
//Crear una sucursal
router.post('/', branchController.createBranch);
//Actualizar una sucursal
router.put('/:id', branchController.updateBranch);
//Borrar una sucursal
router.delete('/:id', branchController.deleteBranch);
//Filtrar sucursales por parámetros
router.post('/filter', branchController.getBranchesByProps);
module.exports = router;

// bankRoutes.js
const express = require('express');
const router = express.Router();
const bankController = require('../controllers/bankController');
const upload = require("../middlewares/uploadBankLogo");

router.get('/', bankController.getBanksByProps);
router.get('/bypage/:npage', bankController.getBanksByPage);

router.get('/:id', bankController.getBankById);
router.post('/', bankController.createBank);
router.put('/:id', bankController.updateBank);
router.delete('/:id', bankController.deleteBank);
router.post("/upload-logo/:id", upload.single("logo"), bankController.uploadBankLogo);


module.exports = router;

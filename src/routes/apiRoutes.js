const express = require('express');
const router = express.Router();
const contractController = require('../controllers/contractController');

router.post('/create-project', contractController.createProject);
router.post('/invest', contractController.invest);
router.post('/withdraw-funds', contractController.withdrawFunds);

module.exports = router;

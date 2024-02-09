const express = require('express');
const { createListing, deleteListing, updateListing, getListing, getListings, getDashboardData } = require('../controllers/listingController.js');
// import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', createListing);
router.delete('/delete/:id', deleteListing);
router.post('/update/:id', updateListing);
router.get('/get/:id', getListing);
router.get('/', getListings);
router.get('/admindata', getDashboardData);

module.exports = router;

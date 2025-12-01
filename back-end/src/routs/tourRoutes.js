    import express from "express";

    const router = express.Router();

    const tourController = require('../controllers/tourController');
    const upload = require('../config/multerConfig');

    // field name 'image' phải trùng với name ở FE
    router.post('/new-tour', upload.single('image'), tourController.handlNewtour);

    module.exports = router;

// Dependencies
import express from 'express';
import userController from '../controllers/userController';


const router = express.Router();
// Routes
router.route('/users')
.post(userController.signup);


// Return router
export default router;
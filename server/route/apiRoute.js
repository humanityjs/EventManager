// Dependencies
import express from 'express';
import UserController from '../controllers/userController'
;


const router = express.Router();
// Routes
router.route('/users')
.post(UserController.signup);


// Return router
export default router;
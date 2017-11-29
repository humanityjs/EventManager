// Dependencies
import express from 'express';
import userController from '../controllers/userController';
import centerController from '../controllers/centerController';


const router = express.Router();
// Routes
router.route('/users')
  .post(userController.signup);

router.route('/users/login')
  .post(userController.signin);

router.route('/centers')
  .post(centerController.postCenter)
  .get(centerController.getAllCenters);

router.route('/centers/:id')
  .get(centerController.getSingleCenter);

// Return router
export default router;

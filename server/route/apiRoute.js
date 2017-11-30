// Dependencies
import express from 'express';
import userController from '../controllers/userController';
import centerController from '../controllers/centerController';
import eventController from '../controllers/eventController';
import authToken from '../middleware/authenticateToken';
import validate from '../middleware/validate';


const router = express.Router();
// Routes
router.route('/users')
  .post(validate.signup, userController.signup);

router.route('/users/login')
  .post(validate.signin, userController.signin);

router.route('/centers')
  .post(authToken, centerController.postCenter)
  .get(authToken, centerController.getAllCenters);

router.route('/centers/:id')
  .get(authToken, centerController.getSingleCenter)
  .put(authToken, centerController.updateCenter);

router.route('/events')
  .post(authToken, eventController.postEvent);

router.route('/events/:id')
  .put(authToken, eventController.updateEvent);
// Return router
export default router;

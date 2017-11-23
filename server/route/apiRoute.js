// Dependencies
import express from 'express';
import centerController from '../controllers/centers';
import eventController from '../controllers/events';
import Validate from '../middleware/validate';

const router = express.Router();
// Routes
router.route('/centers')
.get(centerController.getAllCenters)
.post(Validate.postCenterValidation, centerController.postCenter);

router.route('/centers/:id')
.get(centerController.getSingleCenter)
.put(centerController.updateCenter)
.delete(centerController.deleteCenter);

router.route('/events')
.get(eventController.getAllEvents)
.post(eventController.postEvent);

router.route('/events/:id')
.get(eventController.getSingleEvent)
.put(eventController.updateEvent)
.delete(eventController.deleteEvent);

// Return router
export default router;
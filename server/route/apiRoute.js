// Dependencies
import express from 'express';
import centerController from '../controllers/centers';
import eventsController from '../controllers/events';


const router = express.Router();
// Routes
router.route('/centers')
.get(centerController.getAllCenters)
.post(centerController.postCenter);

router.route('/events')
.get(eventsController)
;

router.route('/centers/:id')
.get(centerController.getSingleCenter);

// Return router
export default router;
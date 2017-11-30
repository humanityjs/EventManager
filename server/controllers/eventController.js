import models from '../models';

const { Events } = models;

class EventController {
  static postEvent(req, res) {
    const {
      title, centerId, description, bookedDate,
    } = req.body;
    const { id, isAdmin } = req.decoded;

    // check if user is privileged
    if (!isAdmin) {
      // query db
      return Events.findOne({
        where: {
          centerId, bookedDate,
        },
      }).then((event) => {
        if (event) {
          return res.status(400).json({
            message: 'The date chosen is booked, Please select another day',
          });
        }
        return Events.create({
          title,
          description,
          bookedDate,
          centerId,
          userId: id,
        }).then((bookedEvent) => {
          res.status(200).json({
            message: 'Event booked Successfully',
            bookedEvent,
          });
        }).catch(error => res.status(500).json({
          message: error.message,
        }));
      }).catch((error) => {
        res.status(500).json({
          message: error.message,
        });
      });
    }
    // unauthorised user
    return res.status(403).json({
      message: 'You are not authorised to view this page',
    });
  }

  static updateEvent(req, res) {
    const {
      title, description, bookedDate, centerId,
    } = req.body;
    const { id, isAdmin } = req.decoded;

    if (!isAdmin) {
      // query db
      return Events.findOne({
        where: {
          centerId, bookedDate,
        },
      }).then((event) => {
        if (event) {
          return res.status(400).json({
            message: 'Center is not available for the date chosen',
          });
        }
        return Events.update({
          title: title || event.title,
          bookedDate: bookedDate || event.bookedDate,
          description: description || event.description,
          centerId: centerId || event.centerId,
          userId: id,
        }, {
          where: {
            id: req.params.id,
          },
        }).then((modifiedEvent) => {
          res.status(200).json({
            message: 'Changes Applied',
            modifiedEvent,
          });
        }).catch(error => res.status(500).json({
          message: error.message,
        }));
      }).catch(error => res.status(500).json({
        message: error.message,
      }));
    }
    // unauthorised user
    return res.status(403).json({
      message: 'You are not authorised to view this page',
    });
  }
}

export default EventController;

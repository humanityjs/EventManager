import models from '../models';

const { Events } = models;

class EventController {
  static postEvent(req, res) {
    const {
      eventTitle, centerId, description, bookedDate,
    } = req.body;
    const { id } = req.decoded;
    // query db
    return Events.findOne({
      where: {
        centerId, bookedDate,
      },
    }).then((event) => {
      if (event) {
        return res.status(400).send({
          message: 'The date chosen is booked, Please select another day',
        });
      }
      return Events.create({
        eventTitle,
        description,
        bookedDate,
        centerId,
        userId: id,
      }).then((bookedEvent) => {
        res.status(200).send({
          message: 'Event booked Successfully',
          bookedEvent,
        });
      }).catch(error => res.status(500).send({
        message: error.message,
      }));
    }).catch((error) => {
      res.status(500).send({
        message: error.message,
      });
    });
  }

  static updateEvent(req, res) {
    const {
      eventTitle, description, bookedDate, centerId,
    } = req.body;
    const { id } = req.decoded;

    // query db
    return Events.findOne({
      where: {
        centerId, bookedDate,
      },
    }).then((event) => {
      if (event) {
        return res.status(400).send({
          message: 'Center is not available for the date chosen',
        });
      }
      return Events.update({
        eventTitle: eventTitle || event.eventTitle,
        bookedDate: bookedDate || event.bookedDate,
        description: description || event.description,
        centerId: centerId || event.centerId,
        userId: id,
      }, {
        where: {
          id: req.params.id,
        },
      }).then((modifiedEvent) => {
        res.status(200).send({
          message: 'Changes Applied',
          modifiedEvent,
        });
      }).catch(error => res.status(500).send({
        message: error.message,
      }));
    }).catch(error => res.status(500).send({
      message: error.message,
    }));
  }

  static deleteEvent(req, res) {
    const eventId = req.params.id;
    const { userId } = req.decoded;

    return Events.findById(eventId).then((event) => {
      if (event) {
        if (event.userId === userId) {
          return Events.destroy({
            where: {
              id: eventId,
            },
          }).then(() => res.status(200).send({
            message: 'Event Deleted',
          }));
        }
      }
      return res.status(400).send({
        message: 'Event does not exist',
      });
    }).catch(error => res.status(500).send({
      message: error.message,
    }));
  }
}

export default EventController;

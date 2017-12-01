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

    // check if date and center collides with input
    return Events.findOne({
      where: {
        bookedDate, centerId,
      },
    }).then((events) => {
      function com(message, condition) {
        return condition.update({
          eventTitle: eventTitle || condition.eventTitle,
          bookedDate: bookedDate || condition.bookedDate,
          description: description || condition.description,
          centerId: centerId || condition.centerId,
        }).then(() => {
          res.status(200).send({
            message,
          });
        });
      }
      if (events) {
        Events.findById(req.params.id).then((event) => {
          if (event) {
            com('Changes Applied', event);
          }
        });
        res.status(403).send({
          message: 'choose day',
        });
      }
      com('Changes2 Applied', events);
    }).catch(error => res.status(500).send({
      message: error.message,
    }));
  }


  static deleteEvent(req, res) {
    const eventId = req.params.id;
    const { id } = req.decoded;

    return Events.findById(eventId).then((event) => {
      if (event) {
        if (event.userId === id) {
          return event.destroy().then(() => res.status(200).send({
            message: 'Event Deleted',
          }));
        }
        return res.status(403).send({
          message: 'You cannot delete an event not booked by you',
        });
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

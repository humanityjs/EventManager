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

    // check if date and center collides with input
    return Events.findOne({
      where: {
        bookedDate, centerId,
      },
    }).then((events) => {
      if (events) {
        if (events.id === Number(req.params.id)) {
          return events.update({
            eventTitle: eventTitle || events.eventTitle,
            bookedDate: bookedDate || events.bookedDate,
            description: description || events.description,
            centerId: centerId || events.centerId,
          }).then(() => res.status(200).send({
            message: 'Changes Applied',
          })).catch(error => res.status(500).send({
            message: error.message,
          }));
        }
        return res.status(401).send({
          message: 'The date you chose is not available, choose another day or center',
        });
      }
      Events.update({
        eventTitle: eventTitle || Events.eventTitle,
        bookedDate: bookedDate || Events.bookedDate,
        description: description || Events.description,
        centerId: centerId || Events.centerId,
      }, {
        where: {
          id: req.params.id,
        },
      }).then(() => res.status(200).send({
        message: 'Changes Applied',
      })).catch(error => res.status(500).send({
        message: error.message,
      }));
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

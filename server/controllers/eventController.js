

import models from '../models';

const { Events, Centers, Activities } = models;

class EventController {
  /**
   *
   *
   * Get All Events
   * @param {obj} req
   * @param {obj} res
   * @returns All the event in db
   * @memberof CenterController
   */
  static getAllEvents(req, res) {
    // get events
    Events.all({
      include: [{
        model: Centers,
      }],
    }).then((events) => {
      // if events are available
      if (events) {
        // show events
        return res.status(200).send({
          events,
        });
      }
      // No Event found
      return res.status(404).send({
        message: 'There are no booked Events',
      });
    }).catch(error => res.status(500).send({
      message: error.message,
    }));
  }

  static getCenterEvents(req, res) {
    // get events
    Events.all({
      where: {
        centerId: req.params.id,
      },
      order: [
        ['bookedDate', 'DESC'],
      ],
    }).then((events) => {
      // if events are available
      if (events) {
        // show events
        return res.status(200).send({
          events,
        });
      }
      // No Event found
      return res.status(404).send({
        message: 'There are no booked Events',
      });
    }).catch(error => res.status(500).send({
      message: error.message,
    }));
  }

  static getUserEvents(req, res) {
    const { id } = req.decoded;
    // get events
    Events.all({
      where: {
        userId: id,
      },
      include: [{
        model: Centers,
      }],
    }).then((events) => {
      // if events are available
      if (events) {
        // show events
        return res.status(200).send({
          events,
        });
      }
      // No Event found
      return res.status(404).send({
        message: 'There are no booked Events',
      });
    }).catch(error => res.status(500).send({
      message: error.message,
    }));
  }

  static getSingleEvent(req, res) {
    Events.findOne({
      where: {
        id: req.params.id,
      },
    })
      .then((event) => {
        if (event) {
          return res.status(200).send({
            event,
          });
        }
        return res.status(400).send({
          message: 'No Event Found',
        });
      }).catch(error => res.status(500).send({
        message: error.message,
      }));
  }

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
          message: 'The date chosen is booked, Please select another day or center',
        });
      }
      return Events.create({
        eventTitle,
        description,
        bookedDate,
        centerId,
        userId: id,
      }).then((bookedEvent) => {
        res.status(201).send({
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
      eventTitle, description, bookedDate, centerId, isApproved,
    } = req.body;
    const { id } = req.params;
    // find the requested event
    Events.findById(id).then((event) => {
      if (event) {
        Events.findOne({
          where: {
            bookedDate, centerId,
          },
        }).then((events) => {
          if (events) {
            if (events.id === event.id) {
              return events.update({
                eventTitle: eventTitle || events.eventTitle,
                bookedDate: bookedDate || events.bookedDate,
                description: description || events.description,
                centerId: centerId || events.centerId,
                isApproved: isApproved || events.isApproved,
              }).then(() => res.status(200).send({
                message: 'Changes Applied',
                event,
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
            isApproved: isApproved || Events.isApproved,
          }, {
            where: {
              id,
            },
          }).then(() => res.status(200).send({
            message: 'Changes Applied',
            event,
          })).catch(error => res.status(500).send({
            message: error.message,
          }));
        }).catch(error => res.status(500).send({
          message: error.message,
        }));
      } else {
        return res.status(404).send({
          message: 'Event does not exist',
        });
      }
    });
  }


  static deleteEvent(req, res) {
    const eventId = req.params.id;
    const { id, isAdmin } = req.decoded;

    return Events.findById(eventId).then((event) => {
      if (event) {
        if (event.userId === id || isAdmin) {
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

  static getEventBookedCount(req, res) {
    Events.findAll({
      where: {
        userId: req.params.id,
      }
    }).then((event) => {
      const eventBookedCount = event.length;
      res.status(200).send({
        eventBookedCount,
      })
    }).catch(err => res.status(500).send({
      message: err.message,
    }));
  }

  // static getEventDeletedCount(req, res) {
  //   Events.findById(req.params.id).then(eventDeletedCount => res.status(200).send({
  //     eventDeletedCount,
  //   })).catch(err => res.status(500).send({
  //     message: err.message,
  //   }));
  // }
}


export default EventController;

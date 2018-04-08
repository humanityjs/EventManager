import models from '../models';

const { Adminactivities } = models;

export default class AdminctivityController {
  static getActivity(req, res) {
    Adminactivities.findAll({
      where: {
        userId: req.decoded.id,
      },
    }).then((activities) => {
      // if activities are available
      if (activities) {
        // show activities
        return res.status(200).send({
          activities,
        });
      }
      // No activity found
      return res.status(404).send({
        message: 'There is no new activity',
      });
    }).catch(error => res.status(500).send({
      message: error.message,
    }));
  }
  static setActivity(req, res) {
    const { eventTitle, text, reason, suggestion, centerName, id } = req.body;
    let info;
    if (text) {
      info = `Your Event booking, "${eventTitle}" has been ${text}`;
    } else {
      info = `Your Event booking, "${eventTitle}" is added and awaiting approval`;
    }
    if (centerName) {
      info = `You added a new center ${centerName}`;
    }
    Adminactivities.create({
      description: info,
      userId: req.decoded.id,
      reason,
      suggestion,
      centerId: id,
    }).then(() => res.status(200).send({
      message: 'Activity added successfully',
    })).catch(error => res.status(500).send({
      message: error.message,
    }));
  }

  static deleteActivity(req, res) {
    const { id } = req.params;
    return Adminactivities.findAll({
      where: {
        eventId: id,
      },
    }).then((Activity) => {
      if (Activity) {
        return Activity.destroy().then(() => res.status(200).send({
          message: 'Activity Deleted',
        }));
      }
      return res.status(400).send({
        message: 'Activity does not exist',
      });
    }).catch(error => res.status(500).send({
      message: error.message,
    }));
  }
}


import models from '../models';

const { Activities } = models;

export default class ActivityController {
  static getActivity(req, res) {
    Activities.findAll().then((activities) => {
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
    const { user, centername, title, eventId, centerId } = req.body;
    const info = `${user} booked ${title} for ${centername}`;
    Activities.create({
      description: info,
      eventId,
      centerId,
    }).then(() => res.status(200).send({
      message: 'Activity added successfully',
    })).catch(error => res.status(500).send({
      message: error.message,
    }));
  }

  static deleteActivity(req, res) {
    const { id } = req.params;
    return Activities.findAll({
      where: {
        eventId: id,
      }
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


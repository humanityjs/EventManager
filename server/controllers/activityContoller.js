import { Activities } from '../models';

export default class ActivityController {

  static setActivity(req, res) {
    const { user, eventName, title } = req.body;
    const info = `${user} booked ${title} for ${eventName}`;
    Activities.create({
      description: info,
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


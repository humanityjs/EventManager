import models from '../models';

const { Centers } = models;

class CenterController {
  /**
   *
   *
   * Get All Centers
   * @param {obj} req
   * @param {obj} res
   * @returns All the center in db
   * @memberof CenterController
   */
  static getAllCenters(req, res) {
    if (!req.query.sort) {
      Centers.all().then((center) => {
        if (center) {
          return res.status(200).json({
            center,
          });
        }
        return res.status(404).json({
          message: 'There are no available Centers',
        });
      }).catch(error => res.status(404).json({
        message: error.message,
      }));
    }
  }

  /**
   *
   *
   * @static Get a single center
   * @param {obj} req
   * @param {obj} res
   * @returns A single center
   * @memberof CenterController
   */

  static getSingleCenter(req, res) {
    Centers.findById(req.params.id)
      .then((center) => {
        if (center) {
          return res.status(200).json({
            center,
          });
        }
        return res.status(400).json({
          message: 'No Center Found',
        }).catch(error => res.status(500).json({
          message: error.message,
        }));
      });
  }

  /**
   *
   *
   * @static Creates a new center
   * @param {obj} req
   * @param {obj} res
   * @returns Success message with the list of centers
   * @memberof centerController
   */
  static postCenter(req, res) {
    const {
      cname,
      location,
      description,
      facilities,
      userId,
    } = req.body;

    Centers.create({
      cname,
      location,
      description,
      facilities,
      userId,
    }).then(center => res.status(201).json({
      status: 'Success',
      message: 'Successfully created a center',
      data: {
        CenterName: center.cname,
      },
    })).catch(error => res.status(500).json({
      status: 'Failed',
      message: error.message,
    }));
  }

  /**
  *
  *
  * @static Update a center
  * @param {obj} req
  * @param {obj} res
  * @returns message and list of centers as the case may be
  * @memberof centerController
  */
  static updateCenter(req, res) {
    for (let i = 0; i < centers.length; i++) {
      if (centers[i].id === parseInt(req.params.id, 10)) {
        centers[i].name = req.body.name || centers[i].name;
        centers[i].location = req.body.location || centers[i].location;
        centers[i].facilities = req.body.facilities || centers[i].facilities;
        centers[i].description = req.body.description || centers[i].description;

        return res.status(200).json({
          message: 'Success',
          error: false,
          centers,
        });
      }
    }
    return res.status(404).json({
      message: 'Center not Found',
      error: true,
    });
  }

  /**
   *
   *
   * @static Delete an Event
   * @param {obj} req
   * @param {obj} res
   * @returns
   * @memberof centerController
   */
  static deleteCenter(req, res) {
    for (let i = 0; i < centers.length; i++) {
      if (centers[i].id === parseInt(req.params.id, 10)) {
        centers.splice(i, 1);
        return res.json({
          message: 'Center Deleted',
          error: false,
        });
      }
    }
    return res.status(404).json({
      message: 'Center not Found',
      error: true,
    });
  }
}

export default CenterController;

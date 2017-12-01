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
    const { isAdmin } = req.decoded;

    // get centers
    Centers.all().then((centers) => {
      if (isAdmin) {
        // if centers are available
        if (centers) {
          // show centers
          return res.status(200).send({
            centers,
          });
        }
        // No center found
        return res.status(404).send({
          message: 'There are no available Centers',
        });
      }
      // Unauthorised user
      return res.status(403).send({
        message: 'You are not allowed to view this page',
      });
    }).catch(error => res.status(500).send({
      message: error.message,
    }));
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
    const { isAdmin } = req.decoded;
    Centers.findById(req.params.id)
      .then((center) => {
        if (isAdmin) {
          if (center) {
            return res.status(200).send({
              center,
            });
          }
          return res.status(400).send({
            message: 'No Center Found',
          });
        }// Unauthorised user
        return res.status(403).send({
          message: 'You are not allowed to view this page',
        });
      }).catch(error => res.status(500).send({
        message: error.message,
      }));
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
      centerName, location, description, facilities,
    } = req.body;
    const { id, isAdmin } = req.decoded;

    if (isAdmin) {
      return Centers.findOne({ where: { centerName } })
        .then((foundCenter) => {
          if (foundCenter) {
            res.status(400).send({
              message: `${centerName} already exist`,
            });
          }
          const facilityArray = facilities.split(',');
          Centers.create({
            centerName,
            location,
            description,
            facilities: facilityArray,
            userId: id,
          }).then(center => res.status(201).send({
            message: 'Successfully created a center',
            data: {
              CenterName: center.centerName,
            },
          })).catch(error => res.status(500).send({
            message: error.message,
          }));
        }).catch(error => res.status(500).send({
          message: error.message,
        }));
    }// Unauthorised user
    return res.status(403).send({
      message: 'You are not allowed to view this page',
    });
  }

  /**
     * Modify a center
     * @static
     * @param {object} req
     * @param {object} res
     * @returns {object} insertion error messages or success messages
     * @memberof CenterController
     */
  static updateCenter(req, res) {
    const {
      centerName, location, description, facilities,
    } = req.body;
    const { isAdmin } = req.decoded;
    const id = req.params.id;

    return Centers.findById(id).then((center) => {
      if (isAdmin) {
        const facilityArray = facilities.split(',');
        return center.update({
          centerName: centerName || center.centerName,
          location: location || center.location,
          description: description || center.description,
          facilities: facilityArray || center.facilities,
        }).then(() => res.status(201).send({
          message: 'Successfully updated center',
        })).catch(error => res.status(500).send({
          message: error.message,
        }));
      }
      return res.status(403).send({
        message: 'You are not permitted to be here',
      });
    }).catch(() => res.status(404).send({
      message: 'Center not found',
    }));
  }
}

export default CenterController;

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
    Centers.all().then((center) => {
      if (isAdmin) {
        // if centers are available
        if (center) {
          // show centers
          return res.status(200).json({
            center,
          });
        }
        // No center found
        return res.status(404).json({
          message: 'There are no available Centers',
        });
      }
      // Unauthorised user
      return res.status(403).json({
        message: 'Your are not allowed to view this page',
      });
    }).catch(error => res.status(500).json({
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
            return res.status(200).json({
              center,
            });
          }
          return res.status(400).json({
            message: 'No Center Found',
          });
        }// Unauthorised user
        return res.status(403).json({
          message: 'Your are not allowed to view this page',
        });
      }).catch(error => res.status(500).json({
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
      cname, location, description, facilities,
    } = req.body;
    const { id, isAdmin } = req.decoded;

    if (isAdmin) {
      return Centers.findOne({ where: { cname } })
        .then((foundCenter) => {
          if (foundCenter && foundCenter.cname === cname) {
            res.status(400).json({
              message: `${cname} already exist`,
            });
          }
          const arr = facilities.split(',');
          Centers.create({
            cname,
            location,
            description,
            facilities: arr,
            userId: id,
          }).then(center => res.status(201).json({
            message: 'Successfully created a center',
            data: {
              CenterName: center.cname,
            },
          })).catch(error => res.status(500).json({
            message: error.message,
          }));
        }).catch(error => res.status(500).json({
          message: error.message,
        }));
    }// Unauthorised user
    return res.status(403).json({
      message: 'Your are not allowed to view this page',
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
      cname, location, description, facilities,
    } = req.body;
    const { isAdmin } = req.decoded;
    const id = req.params.id;

    return Centers.findById(id).then((center) => {
      if (isAdmin) {
        const facilityArray = facilities.split(',');
        return center.update({
          cname: cname || center.cname,
          location: location || center.location,
          description: description || center.description,
          facilities: facilityArray || center.facilities,
        }, {
          where: {
            id,
          },
        }).then(() => res.status(201).json({
          message: 'Successfully updated center',
        })).catch(error => res.status(500).json({
          message: error.message,
        }));
      }
      return res.status(403).json({
        message: 'You are not permitted to be here',
      });
    }).catch(() => res.status(404).json({
      message: 'Center not found',
    }));
  }
}

export default CenterController;

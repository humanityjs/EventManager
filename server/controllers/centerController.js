import models from '../models';

const { Centers, Events } = models;

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
    const { location, facilities, capacity, capacityType, btwValue } = req.query;
    let locationSearch;
    let facilitySearch;
    let capacitySearch;
    if (location) {
      locationSearch = {
        $ilike: `%${location}%`,
      }
    } else {
      locationSearch = {
        $ne: null,
      } 
    }
    if (facilities) {
      let facility = facilities.toLowerCase();
      facilitySearch = {
        $contains: [facility],
      }
    } else {
      facilitySearch = {
        $ne: null,
      }
    }
    if (capacity) {
      if (capacityType === 'greater') {
        capacitySearch = {
          $gt: capacity,
        }
      } else if (capacityType === 'lesser') {
        capacitySearch = {
          $lt: capacity,
        }
      } else if (capacityType === 'equal') {
        capacitySearch = {
          $eq: capacity,
        }
      } else if (capacityType === 'between') {
        capacitySearch = {
          $between: [capacity, btwValue],
        }
      }
    } else {
      capacitySearch = {
        $ne: null,
      }
    }
      
    // get centers
    Centers.findAll({
      where: {
        location: locationSearch,
        facilities: facilitySearch,
        capacity: capacitySearch,
      },
    }).then((centers) => {
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
    Centers.findOne({
      where: {
        id: req.params.id,
      },
      include: [{
        model: Events,
      }],
    })
      .then((center) => {
        if (center) {
          return res.status(200).send({
            center,
          });
        }
        return res.status(400).send({
          message: 'No Center Found',
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
      centerName, location, description, facilities, capacity,
    } = req.body;
    const { id } = req.decoded;

    Centers.findOne({ where: { centerName } })
      .then((foundCenter) => {
        if (foundCenter) {
          return res.status(400).send({
            message: `${centerName} already exist`,
          });
        }
        const facilityArray = facilities.split(',');
        Centers.create({
          centerName,
          location,
          description,
          facilities: facilityArray,
          capacity,
          userId: id,
        }).then(center => res.status(201).send({
          center,
          message: 'Successfully created a center',
        })).catch(error => res.status(500).send({
          message: error.message,
        }));
      }).catch(error => res.status(500).send({
        message: error.message,
      }));
  }

  /**
     * Modify a center
     * @static
     * @param {object} req
     * @param {object} res
     * @returns {object} update error messages or success messages
     * @memberof CenterController
     */
  static updateCenter(req, res) {
    const {
      centerName, location, description, facilities, capacity, image_url,
    } = req.body;
    const { id } = req.params;

    return Centers.findById(id).then((center) => {
      let facilityArray;
      if (facilities !== '') {
        facilityArray = facilities.split(',');
      }
      return center.update({
        centerName: centerName || center.centerName,
        location: location || center.location,
        description: description || center.description,
        facilities: facilityArray || center.facilities,
        capacity: capacity || center.capacity,
        image_url: image_url || center.image_url,
      }).then(() => res.status(200).send({
        message: 'Successfully updated center',
      })).catch(error => res.status(500).send({
        message: error.message,
      }));
    }).catch(() => res.status(404).send({
      message: 'Center not found',
    }));
  }
  /**
 *
 * Delete a Center
 * @static
 * @param {any} req
 * @param {any} res
 * @returns
 * @memberof CenterController
 */
  static deleteCenter(req, res) {
    const centerId = req.params.id;

    return Centers.findById(centerId).then((center) => {
      if (center) {
        return center.destroy().then(() => res.status(200).send({
          message: 'Center Deleted',
        }));
      }
      return res.status(400).send({
        message: 'Center does not exist',
      });
    }).catch(error => res.status(500).send({
      message: error.message,
    }));
  }
}

export default CenterController;

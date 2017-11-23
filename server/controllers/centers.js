import centers from '../models/centers';

 class centerController {
    
    /**
     * 
     * 
     * @static
     * @param {any} req 
     * @param {any} res 
     * @returns 
     * @memberof centerController
     */
    static getAllCenters(req, res) {
        return res.json({
            centers: centers,
            error: false
        }); 
    }

    static getSingleCenter(req, res) {
        for (let i=0; i < centers.length; i++){
            if(centers[i].id === parseInt(req.params.id, 10)){
                return res.json({
                    message: centers[i],
                    error: false
                });  
            }
        } 
        return res.status(404).json({
            message: "Center not Found",
            error: true
        }); 
    }
  /**
   * 
   * 
   * @static
   * @param {obj} req 
   * @param {obj} res 
   * @returns 
   * @memberof centerController
   */
  static postCenter(req, res) {
      if(!req.body.name) {
        return res.json({
            message: centers,
            error: true
        });
      }  
      centers.push({
          id: newId,
          name,
          location
      });
        return res.json({
            message: "success",
            error: false,
            center
        }); 
    }
/**
 * 
 * 
 * @static
 * @param {obj} req 
 * @param {obj} res 
 * @returns 
 * @memberof centerController
 */
static updateCenter(req, res) {
        for (let i=0; i < centers.length; i++){
            if(centers[i].id === parseInt(req.params.id, 10)){
                centers[i].name = req.body.name || centers[i].name;
                centers[i].location = req.body.location || centers[i].location;
                console.log('body:', req, centers);
                return res.json({
                    message: "Success",
                    error: false,
                    centers
                });  
            } else {
                console.log('wrong user');
            }
        }
        return res.status(404).json({
            message: "Center not Found",
            error: true
        }); 
    }

    static deleteCenter(req, res) {
        for (let i=0; i < centers.length; i++){
            if(centers[i].id === parseInt(req.params.id, 10)){
                centers.splice(i,1);
                return res.json({
                    message: "Success",
                    error: false
                });  
            }
        }
        return res.status(404).json({
            message: "Center not Found",
            error: true
        }); 
    }
}

export default centerController;
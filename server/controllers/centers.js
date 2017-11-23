import centers from '../models/centers';

 class centerController {
    
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
  
    static postCenter(req, res) {
      if(!req.body.name) {
        return res.json({
            message: centers,
            error: true
        });
      }  
      centers.push(req, body);
        return res.json({
            message: "success",
            error: false
        }); 
    }

    static updateCenter(req, res) {
        for (let i=0; i < centers.length; i++){
            if(centers[i].id === parseInt(req.params.id, 10)){
                centers[i].name = req.body.name;
                centers[i].location = req.body.location;
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
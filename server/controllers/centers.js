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
            if(centers[i].id === parseInt(req.params.centerid, 10)){
                centers[i].name = req.body.name;
                return res.json({
                    center: centers[i],
                    error: false
                });  
            }
        } 
    }
  
    static postCenter(req, res) {
      if(!req.body.name) {
        return res.json({
            message: "Center name is missing",
            error: true
        });
      }  
      centers.push(req, body);
        return res.json({
            message: "success",
            error: false
        }); 
    }

}

export default centerController;
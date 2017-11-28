import user from '../models/user';

class userController {
  /**
   * 
   * 
   * Get All user
   * @param {obj} req 
   * @param {obj} res 
   * @returns All the user in db
   * @memberof userController
   */
  static getAllUser(req, res) {
    return res.json({
      user
      
    });   
  }
  
  /**
   * 
   * 
   * @static Get a single user
   * @param {obj} req 
   * @param {obj} res 
   * @returns A single user
   * @memberof userController
   */
  static getSingleUser(req, res) {
    for (let i=0; i < user.length; i++){
      if(user[i].id === parseInt(req.params.id, 10)){
        return res.json({
          message: user[i],
           
        });  
      } 
    } 
    return res.status(404).json({
      message: "user not Found",
        
    }); 
  }
    
  /**
   * 
   * 
   * @static Creates a new user
   * @param {obj} req 
   * @param {obj} res 
   * @returns Success message with the list of user
   * @memberof userController
   */
  static postUser(req, res) {
    if((!req.body.fullname) || (!req.body.email) || (!req.body.password)){
      return res.json({
        message: user,
        
      });
    }
    const newId = user.length + 1;
    const fullname = req.body.fullname;
    const email = req.body.email;
    const password = req.body.password;

    user.push({
      id: newId,
      fullname,
      email,
      password
    });
    return res.json({
      message: "success",
      user
    }); 
  }

  /**
  * 
  * 
  * @static Update a user
  * @param {obj} req 
  * @param {obj} res 
  * @returns message and list of user as the case may be
  * @memberof userController
  */
  static updateUser(req, res) {
    for (let i=0; i < user.length; i++){
      if (user[i].id === parseInt(req.params.id, 10)){
        user[i].fullname = req.body.fullname || user[i].fullname;
        user[i].email = req.body.email || user[i].email;
        user[i].password = req.body.password || user[i].password;
    
        return res.json({
          message: "Success",
          user
        });        
      } 
    }
    return res.status(404).json({
      message: "user not Found",
      
    }); 
  }    
    
  /**
   * 
   * 
   * @static Delete a user
   * @param {obj} req 
   * @param {obj} res 
   * @returns  
   * @memberof userController
   */
  static deleteuser(req, res) {
    for (let i=0; i < user.length; i++){
      if(user[i].id === parseInt(req.params.id, 10)){
        user.splice(i,1);
          return res.json({
            message: "user Deleted",
            
          });  
      }
    }
    return res.status(404).json({
      message: "user not Found",
      
    }); 
  }

}

export default userController;
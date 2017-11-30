<<<<<<< HEAD
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import env from 'dotenv';
import models from '../models';

const { Users } = models;

env.config();
/**
 * @class UserController
 */
export default class UserController {
  /**
     * Users details are captured and persisted on the database
     * @static
     * @param {object} req
     * @param {object} res
     * @returns {object} Failure message or Success message with the persisted database data
     * @memberof UserController
     */
  static signup(req, res) {
    const { fullname, email, password, isAdmin } = req.body;

    Users.findOne({
      where: {
        email,
      },
    }).then((foundUser) => {
      let error;
      if (foundUser) {
        if (foundUser.email === email) {
          error = email;
        }
        return res.status(400).json({
          message: `${error} already exist`,
        });
      }
      const saltRounds = 10;
      bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          Users.create({
            fullname,
            email,
            password: hash,
            isAdmin,
          }).then(user => res.status(201).json({
            message: 'Successfully created account',
            data: {
              user,

            },
          }));
        });
      });
    })
      .catch(error => res.status(500).json({
        status: 'Failed',
        message: error.message,
      }));
  }

  /**
     * User details are captured and authenticated against persisted database data
     * @static
     * @param {object} req
     * @param {object} res
     * @returns {object} Failure message or Success message with persisted database data
     * @memberof UserController
     */
  static signin(req, res) {
    const { email, password } = req.body;

    Users.findOne({
      where: {
        email,
      },
    }).then((user) => {
      if (user && user.email.toLowerCase === email.toLowerCase) {
        const check = bcrypt.compareSync(password, user.password);
        if (check) {
          const payload = { email: user.email, isAdmin: user.isAdmin, id: user.id };
          const userData = jwt.sign(payload, process.env.SECRET, {
            expiresIn: 60 * 60 * 5,
          });
          req.body.token = userData;
          return res.status(200).json({
            message: 'You are now logged In',
            data: {
              user,
            },
            userData,
          });
        }
        return res.status(400).json({
          message: 'Invalid username or password',
        });
      }
      return res.status(404).json({
        message: 'User not found',
      });
    }).catch(error => res.status(500).json({
      status: 'Failed',
      message: error.message,
    }));
  }
}
=======
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
>>>>>>> develop

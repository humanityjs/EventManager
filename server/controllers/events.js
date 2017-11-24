import events from '../models/events';

class eventController {
  /**
   * 
   * 
   * Get All events
   * @param {obj} req 
   * @param {obj} res 
   * @returns All the event in db
   * @memberof eventController
   */
  static getAllEvents(req, res) {
    return res.json({
      events: events,
      error: false
    });   
  }
  
  /**
   * 
   * 
   * @static Get a single event
   * @param {obj} req 
   * @param {obj} res 
   * @returns A single event
   * @memberof eventController
   */
  static getSingleEvent(req, res) {
    for (let i=0; i < events.length; i++){
      if(events[i].id === parseInt(req.params.id, 10)){
        return res.json({
          message: events[i],
          error: false 
        });  
      } 
    } 
    return res.status(404).json({
      message: "event not Found",
      error: true  
    }); 
  }
    
  /**
   * 
   * 
   * @static Creates a new event
   * @param {obj} req 
   * @param {obj} res 
   * @returns Success message with the list of events
   * @memberof eventController
   */
  static postEvent(req, res) {
    if((!req.body.name) || (!req.body.center) || (!req.body.facilities)){
      return res.json({
        message: events,
        error: true
      });
    }
    const newId = events.length + 1;
    const name = req.body.name;
    const center = req.body.center;
    const facilities = req.body.facilities;
    const Booked_Date = req.body.Booked_Date;

    events.push({
      id: newId,
      name,
      center,
      facilities,
      Booked_Date
    });
    return res.json({
      message: "success",
      error: false,
      events
    }); 
  }

  /**
  * 
  * 
  * @static Update a event
  * @param {obj} req 
  * @param {obj} res 
  * @returns message and list of events as the case may be
  * @memberof eventController
  */
  static updateEvent(req, res) {
    for (let i=0; i < events.length; i++){
      if (events[i].id === parseInt(req.params.id, 10)){
        events[i].name = req.body.name || events[i].name;
        events[i].center = req.body.center || events[i].center;
        events[i].facilities = req.body.facilities || events[i].facilities;
        events[i].Booked_Date = req.body.Booked_Date || events[i].Booked_Date;  
    
        return res.json({
          message: "Success",
          error: false,
          events
        });        
      } 
    }
    return res.status(404).json({
      message: "event not Found",
      error: true
    }); 
  }    
    
  /**
   * 
   * 
   * @static Delete an Event
   * @param {obj} req 
   * @param {obj} res 
   * @returns  
   * @memberof eventController
   */
  static deleteEvent(req, res) {
    for (let i=0; i < events.length; i++){
      if(events[i].id === parseInt(req.params.id, 10)){
        events.splice(i,1);
          return res.json({
            message: "event Deleted",
            error: false
          });  
      }
    }
    return res.status(404).json({
      message: "event not Found",
      error: true
    }); 
  }

}

export default eventController;
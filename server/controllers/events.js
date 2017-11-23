import events from '../models/events';

 class eventController {
    
    static getAllEvents(req, res) {
        return res.json({
            events: events,
            error: false
        }); 
    }

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
  
    static postEvent(req, res) {
      if(!req.body.name) {
        return res.json({
            message: events,
            error: true
        });
      }  
      events.push(req, body);
        return res.json({
            message: "success",
            error: false
        }); 
    }

    static updateEvent(req, res) {
        for (let i=0; i < events.length; i++){
            if(events[i].id === parseInt(req.params.id, 10)){
                events[i].name = req.body.name;
                events[i].location = req.body.location;
                return res.json({
                    message: "Success",
                    error: false
                });  
            }
        }
        return res.status(404).json({
            message: "event not Found",
            error: true
        }); 
    }

    static deleteEvent(req, res) {
        for (let i=0; i < events.length; i++){
            if(events[i].id === parseInt(req.params.id, 10)){
                events.splice(i,1);
                return res.json({
                    message: "Success",
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
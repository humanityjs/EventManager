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
        for (let item = 0; item < events.length; item++ ) {
            if(req.body.name !== item.name) {
                const newEvent = {
                    name: req.body.name,
                    center: req.body.center,
                    id: events.length + 1
                }
                events.push(newEvent);
                return res.json({
                    message: "success",
                    error: false
                }); 
            }  
            return res.json({
                message: "event already exists",
                error: true
            })
        }
    }

    static updateEvent(req, res) {
        for (let i=0; i < events.length; i += 1){
            if(events[i].id === parseInt(req.params.id, 10)){
                events[i].name = req.body.name || events[i].name;
                events[i].location = req.body.location || events[i].location;
                res.status(200).json({
                    message: "successful!",
                    error: false
                })
            } else {
                res.status(404).json({
                    message: "event not Found",
                    error: true
                });
            }
            
        }
        return events;

        
        
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
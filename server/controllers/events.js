import events from '../models/events';


const eventsController = (req, res) => {
    return res.json({
        events: events,
        error: false
    });
}

export default eventsController;
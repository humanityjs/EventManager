import express from 'express';
import userRoute from './route/apiRoute';

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('working');
});

app.use('/', userRoute);


app.listen(3005, () => {
    console.log('API is running on port 3005');
});

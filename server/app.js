import express from 'express';
import userRoute from './route/apiRoute';
import bodyParser from 'body-parser';

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.send('working');
});

app.use('/api/v1/', userRoute);


app.listen(3005, () => {
    console.log('API is running on port 3005');
});

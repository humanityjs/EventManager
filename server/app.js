import express from 'express';
import bodyParser from 'body-parser';
import userRoute from './route/apiRoute';


const app = express();


app.use(bodyParser.json());
<<<<<<< HEAD
app.use(bodyParser.urlencoded({ extended: false }));

=======
app.use(bodyParser.urlencoded({extended: true}));
>>>>>>> develop

app.get('/', (req, res) => {
  res.send('working');
});

app.use('/api/v1/', userRoute);


app.listen(8000, () => {
  console.log('API is running on port 8000');
});

export default app;

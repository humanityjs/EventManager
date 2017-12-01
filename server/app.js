import express from 'express';
import bodyParser from 'body-parser';
import userRoute from './route/apiRoute';


const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res) => {
  res.send('working');
});

app.use('/api/v1/', userRoute);


app.use((req, res) => {
  res.status(404).send({ error: 'page not found' });
});

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
  console.log(`App started on port ${app.get('port')}`);
});

export default app;

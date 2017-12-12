import express from 'express';
import bodyParser from 'body-parser';
import userRoute from './route/apiRoute';


const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res) => res.send({
  message: 'Event Manager Server now Running',
}));

app.use('/api/v1/', (req, res, next) => {
  let err = null;
  try {
    decodeURIComponent(req.path);
  } catch (e) {
    err = e;
  }
  if (err) {
    return res.status(404).send({ error: 'page not found' });
  }
  next();
}, userRoute);


app.all('*', (req, res) => res.status(404).send({ error: 'page not found' }));

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
  console.log(`App started on port ${app.get('port')}`);
});

export default app;

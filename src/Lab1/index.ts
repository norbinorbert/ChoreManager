import express, { Application } from 'express';
import morgan from 'morgan';

const app: Application = express();

app.use(morgan('tiny'));

app.use(express.static('./src/Lab1/public'));

app.listen(8080, () => {
  console.log('Server listening on http://localhost:8080/');
});

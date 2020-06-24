import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';

import api from './routes';

const app = express();
const PORT = 2244 || process.env.PORT;
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('assets'));
dotenv.config();

mongoose.connect(process.env.DB_URI, {useNewUrlParser: true}, (err) => {
  if (err) throw err;
  console.log('Mongoose connected!');
});

/* mongoose package configuration */
/* mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true); */

app.use('/', api);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`)); // Run server

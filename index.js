
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import showRoutes from './routes/shows.js';
import accountRoutes from './routes/accounts.js';
import listRoutes from './routes/lists.js';

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/shows', showRoutes);
app.use('/accounts', accountRoutes);
app.use('/listsdb', listRoutes);

const CONNECTION_URL = 'mongodb+srv://scottsak:Feb!2193803@cluster0.w3za4.mongodb.net/Stub';
const PORT = process.env.PORT|| 5000;

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/public'));
};

app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, 'client/public', 'index.html'));
});

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));
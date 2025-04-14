import app from './app.js';
import 'web-streams-polyfill';
import connectMongo from './config/mongo.js';
import startConnections from './services/imapService.js';
import { createIndex } from './services/searchService.js';

const PORT = process.env.PORT || 6000;

const startServer = async () => {
  await connectMongo();
  await createIndex();
  startConnections();
  app.listen(PORT, () => {
    console.log(`server startaed on port ${PORT}`);
  });
};

startServer();

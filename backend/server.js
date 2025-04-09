import app from './app.js';
import connectMongo from './config/mongo.js';
import startConnections from './services/imapService.js';

const PORT = process.env.PORT || 6000;

const startServer = async () => {
  await connectMongo();
  startConnections();
  app.listen(PORT, () => {
    console.log(`server startaed on port ${PORT}`);
  });
};

startServer();

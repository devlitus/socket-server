import Servers from './server/server';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const server = Servers.instace;
server.app.use(cors());

server.app.use('/', (resp, req) => {
  req.send({
    message: 'holsa'
  });
});

server.start(() => {
  console.log(`Server in http://localhost:${server.port}`);
});

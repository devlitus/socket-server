import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";

export default class Servers {
  private static _instace: Servers;
  public app: express.Application = express();
  public port: string | number;
  public io: Server;
  private httpServer: http.Server;
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 5000;
    this.httpServer = http.createServer(this.app);
    this.io = new Server(this.httpServer, {
      cors: {origin: '*', credentials: true}
    });
    this.listeningSockets();
  }

  public static get instace() {
    return this._instace || (this._instace = new this());
  }

  private listeningSockets()  {
    this.io.on("connection", (client: Socket) => {
      console.log("Escuchando conexiones - socket");
      client.emit("message", "message this scocket");
      console.log("client connection");
      client.on('message', (data) => {
        console.log(data);
      })
      client.on('disconnect', () => {
        console.log('client disconnect');
      })
    });
  }

  start(callback: any) {
    this.httpServer.listen(this.port, callback);
  }
}

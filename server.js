import "dotenv/config.js";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import router from "./src/routers/index.router.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import __dirname from "./utils.js";
import { engine } from "express-handlebars";
import { createServer } from "http";
import { Server } from "socket.io";
import socketCb from "./src/routers/index.socket.js";
import session from "express-session";
import userRender from "./src/middlewares/userRender.mid.js";
import dbConnect from "./src/utils/db.util.js";

try {
  const server = express();
  const port = process.env.PORT || 8000;
  const ready = () => {
    console.log("server ready on port " + port);
    dbConnect();
  };
  const httpServer = createServer(server);
  const tcpServer = new Server(httpServer);
  tcpServer.on("connection", socketCb);
  httpServer.listen(port, ready);

  server.use(express.urlencoded({ extended: true }));
  server.use(express.json());
  server.use(cors());
  server.use("/public", express.static("public"));
  server.use(morgan("dev"));

  server.use("/public", express.static("public"));
  server.engine("handlebars", engine());
  server.set("view engine", "handlebars");
  server.set("views", __dirname + "/src/views");

  server.use(
    session({
      secret: "tu_secreto_aqui", // Cambia esto a un secreto seguro
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false },
    })
  );
  server.use((req, res, next) => {
    if (req.session) {
      req.session.save((err) => {
        if (err) {
          console.log("Error saving session:", err);
        }
        next();
      });
    } else {
      next();
    }
  });

  server.use(router);
  server.use(userRender);
  server.use(errorHandler);
  server.use(pathHandler);
} catch (error) {
  console.log(error);
}

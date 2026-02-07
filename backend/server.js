import express from "express";
import cors from "cors";
import router from "./src/router/router.js";
import cookieParser from "cookie-parser"
const server = express();
server.use(express.json());
server.use(cors());
server.use(cookieParser())

server.use("/api", router);
server.listen(9090, () => {
  console.log("Server running on port 9090");
});

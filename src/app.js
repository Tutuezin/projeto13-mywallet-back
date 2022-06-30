import express from "express";
import cors from "cors";
import chalk from "chalk";
import dotenv from "dotenv";
import { signIn } from "./controllers/auth/signIn.js";

//CONFIGS
dotenv.config();
const server = express();
server.use([cors(), express.json()]);

server.post("/sign-in", signIn);

server.listen(5000, () => {
  console.log(chalk.bold.green("Server rodando..."));
});

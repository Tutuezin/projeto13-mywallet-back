import express from "express";
import cors from "cors";
import chalk from "chalk";
import dotenv from "dotenv";
import authRouter from "./routes/authRouter.js";
import transactionsRouter from "./routes/transactionsRouter.js";

//CONFIGS
dotenv.config();
const server = express();
server.use([cors(), express.json()]);

server.use(authRouter);
server.use(transactionsRouter);

const PORT = process.env.PORT;
server.listen(PORT || 5000, () => {
  console.log(chalk.bold.green("Server rodando..."));
});

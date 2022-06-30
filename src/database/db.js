import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import chalk from "chalk";

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);
let db;
client.connect(() => {
  console.log(chalk.bold.yellow("Conectado ao DataBase..."));
  db = client.db("apiMyWallet");
});

export { db };

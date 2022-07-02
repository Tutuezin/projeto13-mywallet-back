import { db } from "../database/db.js";
import dayjs from "dayjs";
import { ObjectId } from "mongodb";

export async function home(req, res) {
  try {
    const { session } = res.locals;

    const transactions = await db
      .collection("transactions")
      .find({ userId: session.userId })
      .toArray();

    res.send(transactions);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

export async function transaction(req, res) {
  try {
    const { session } = res.locals;
    const transaction = req.body;
    transaction.date = dayjs().format("DD/MM");

    await db
      .collection("transactions")
      .insertOne({ ...transaction, userId: session.userId });

    res.status(201).send("Transação realizada!");
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

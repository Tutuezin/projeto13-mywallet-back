import { db } from "../database/db.js";
import dayjs from "dayjs";

export async function home(req, res) {
  try {
    const { session } = res.locals;

    const transactions = await db
      .collection("transactions")
      .find({ userId: session.userId }) // usar new ObjectId se precisar
      .toArray();

    const user = await db.collection("users").findOne({ _id: session.userId });

    res.send({ transactions, user });
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

    const user = await db.collection("users").findOne({ _id: session.userId });
    let newBalance;

    if (transaction.type === "deposit") {
      newBalance = Number(user.balance) + Number(transaction.amount);
    } else {
      newBalance = Number(user.balance) - Number(transaction.amount);
    }
    await db.collection("users").updateOne(
      {
        _id: user._id,
      },
      { $set: { balance: newBalance } }
    );

    await db
      .collection("transactions")
      .insertOne({ ...transaction, userId: session.userId });

    res.status(201).send({ newBalance });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

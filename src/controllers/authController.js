import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { db } from "../database/db.js";

export async function signUp(req, res) {
  try {
    const user = req.body;
    const token = uuid();

    // Caso tudo esteja validado vamos criptografar os dados antes
    // de entrar no banco de dados.
    const passwordHash = bcrypt.hashSync(user.password, 10);

    //Cadastrar de fato os dados no banco com o a senha criptografada.
    await db.collection("users").insertOne({
      ...user,
      password: passwordHash,
    });
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

export async function signIn(req, res) {
  try {
    const { email, password } = req.body;

    const user = await db.collection("users").findOne({ email });

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = uuid();
      const name = user.name;

      await db.collection("sessions").insertOne({
        userId: user._id,
        token,
      });
      res.status(200).send({ token, name });
    } else {
      res.status(401).send("Email ou senha incorretos!");
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { db } from "../../database/db.js";
import joi from "joi";

export async function signIn(req, res) {
  try {
    const user = req.body;

    const signInSchema = joi.object({
      name: joi.string().required(),
      email: joi.string().email().required(),
      password: joi.string().required(),
      confirmPassword: joi.string().valid(joi.ref("password")).required(),
    });

    const { error } = signInSchema.validate(user, {
      abortEarly: false,
    });

    if (error) {
      const messageError = error.details.map((item) => item.message);
      console.log(messageError);
      return res.send(messageError).status(422);
    }

    await db.collection("sessions").insertOne(user);

    //TODO:
    // Caso tudo esteja validado vamos criptografar os dados antes
    // de entrar no banco de dados.

    //Cadastrar de fato os dados no banco com o a senha criptografada.
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

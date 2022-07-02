import signUpSchema from "../schemas/signUpSchema.js";
import { db } from "../database/db.js";

async function validateSignUpSchema(req, res, next) {
  const user = req.body;

  const userExists = await db
    .collection("users")
    .findOne({ email: user.email });

  if (userExists) {
    return res.sendStatus(409);
  }

  const { error } = signUpSchema.validate(user, {
    abortEarly: false,
  });

  if (error) {
    const messageError = error.details.map((item) => item.message);
    return res.send(messageError).status(422);
  }

  next();
}

export default validateSignUpSchema;

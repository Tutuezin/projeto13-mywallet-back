import signInSchema from "../schemas/signInSchema.js";

async function validateSignInSchema(req, res, next) {
  const user = req.body;

  const { error } = signInSchema.validate(user, {
    abortEarly: false,
  });

  if (error) {
    const messageError = error.details.map((item) => item.message);
    return res.status(422).send(messageError);
  }
  next();
}

export default validateSignInSchema;

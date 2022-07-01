import signUpSchema from "../schemas/signUpSchema.js";

async function validateSignUpSchema(req, res, next) {
  const user = req.body;

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

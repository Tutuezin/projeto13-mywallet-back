import transactionSchema from "../schemas/transactionSchema.js";

async function validateTransactionSchema(req, res, next) {
  const user = req.body;

  const { error } = transactionSchema.validate(user, {
    abortEarly: false,
  });

  if (error) {
    const messageError = error.details.map((item) => item.message);
    return res.status(422).send(messageError);
  }
  next();
}

export default validateTransactionSchema;

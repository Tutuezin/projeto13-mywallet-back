import joi from "joi";

const transactionSchema = joi.object({
  amount: joi.number().required(),
  description: joi.string().required(),
});

export default transactionSchema;

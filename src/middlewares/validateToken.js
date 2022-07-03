import { db } from "../database/db.js";

async function validateToken(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  //verifica se token eh valido ou existe
  const session = await db.collection("sessions").findOne({ token });

  res.locals.session = session;

  if (!session) {
    return res.status(401).send("Token Inválido!");
  }

  next();
}

export default validateToken;

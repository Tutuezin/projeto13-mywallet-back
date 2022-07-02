import { Router } from "express";
import { transaction } from "../controllers/transactionsController.js";
import { home } from "../controllers/transactionsController.js";
import validateToken from "../middlewares/validateToken.js";
import validateTransactionSchema from "../middlewares/validateTransactionSchema.js";

const router = Router();
router.get("/home", validateToken, home);
router.post("/deposit", validateToken, validateTransactionSchema, transaction);
router.post("/withdraw", validateToken, validateTransactionSchema, transaction);

export default router;

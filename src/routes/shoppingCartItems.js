import express from "express";
import shoppingCartController from "../controllers/shoppingCartController.js";
import jwtCheck from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:user_id", jwtCheck, shoppingCartController.getShoppingCartItems);
router.post("/", jwtCheck, shoppingCartController.createShoppingCartItem);

export default router;

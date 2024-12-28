import express from "express";
import orderController from "../controllers/orderController.js";
import jwtCheck from "../middleware/authMiddleware.js";
import adminCheck from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/:user_id", jwtCheck, orderController.getOrders);
router.post("/", jwtCheck, orderController.createOrder);
router.put("/:id", jwtCheck, adminCheck, orderController.updateOrder);

export default router;

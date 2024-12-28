import express from "express";
import productController from "../controllers/productController.js";
import jwtCheck from "../middleware/authMiddleware.js";
import adminCheck from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", productController.getProducts);
router.get("/:category", productController.getProductsByCategory);
router.post("/", jwtCheck, adminCheck, productController.createProduct);

export default router;

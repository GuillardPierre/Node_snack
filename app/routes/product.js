import express from "express";
const router = express.Router();
import * as productController from "../controllers/product.js";
import auth from "../midllewares/auth.js";
import productAccess from "../midllewares/productAccess.js";
import validateProduct from "../midllewares/validateProduct.js";

router.get("/", auth, productController.getAllUserProducts);
router.post("/", auth, validateProduct, productController.createUserProduct);
router.put("/:id", auth, productAccess, validateProduct, productController.updateUserProduct);
router.delete("/:id", auth, productAccess, productController.deleteUserProduct);

export default router;

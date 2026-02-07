import express from "express";
import { handleRegister } from "../auth/regester.js";
import {handleloging} from '../auth/login.js'

import { getproducts } from "../product/product.js";
import { postProduct } from "../product/product.js";
const router = express.Router();

router.post("/register",handleRegister);
router.post("/login",handleloging);
router.get("/products",getproducts);
router.post("/products",postProduct)
export default router;

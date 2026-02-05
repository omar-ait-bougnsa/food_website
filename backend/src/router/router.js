import express from "express";
import { handleRegister } from "../auth/regester.js";
import {handleloging} from '../auth/login.js'
const router = express.Router();

router.post("/register",handleRegister);
router.post("/login",handleloging);
export default router;

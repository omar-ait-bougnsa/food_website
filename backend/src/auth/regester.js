import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient();

export async function handleRegister(req, res) {
  try
  {
    const { email, password, username} = req.body;
    if (!email || !password || !username) {
      return res.status(400).json({ error: "email and password are required" });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email : email,
        username : username,
        password: hash,
        age: 12,
      },
    });
    const token = jwt.sign({userId: user.id, email: user.email}, "qwertyuyiuyuiyerfryegbf", { expiresIn: "1d" })
    res.cookie('token',token, { httpOnly : true, secure : false,maxAge : 24 * 60 * 60 * 1000,sameSite: 'strict' })
    return res.status(201).json({username: user.username,email : user.email,id : user.id,});
  }
  catch (err) {
    if (err.code === "P2002") {
      return res.status(400).json({ error: "Email already exists" });
    }
    return res.status(500).json({ error: "server error" });
  }
}
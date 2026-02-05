import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

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
    return res.status(201).json({username: user.username,email : user.email,id : user.id,});
  }
  catch (err) {
    if (err.code === "P2002") {
      return res.status(400).json({ error: "Email already exists" });
    }
    return res.status(500).json({ error: "server error" });
  }
}
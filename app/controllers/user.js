import { prisma } from "../../app.js";
import { promisify } from "node:util";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const signAsync = promisify(jwt.sign);

export const signup = async (req, res) => {
  const data = req.body;
  if (!data.email || !data.password) {
    res.status(400).send("Email and password are required");
    return;
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    if (error.code === "P2002") {
      res.status(409).send("Email already in use");
      return;
    }
    res.status(500).send("Error during signup: " + error.message);
  }
};

export const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    res.status(400).send("Email and password are required");
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      res.status(404).send("User not found");
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401).send("Invalid password");
      return;
    }

    const token = await signAsync({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: Number(process.env.JWT_EXPIRATION),
    });

    res.status(200).json({ token: token, user: user });
  } catch (error) {
    res.status(500).send("Error during login: " + error.message);
  }
};

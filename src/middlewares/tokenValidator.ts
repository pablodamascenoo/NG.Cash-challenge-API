import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "../config/database.js";

export default async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) throw { status: 401, message: "missing token" };

  const secretKey = process.env.JWT_SECRET;

  try {
    const data = jwt.verify(token, secretKey) as JwtPayload;

    const user = await prisma.user.findFirst({
      where: {
        username: data.username,
      },
    });

    if (!user) throw { status: 404, message: "user not found" };

    res.locals.user = user;
    next();
  } catch (error) {
    console.log(error);
    throw { status: 401, message: "invalid token" };
  }
}

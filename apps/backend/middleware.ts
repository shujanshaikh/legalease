import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "./config";


export function authMiddleware(req : Request , res : Response , next : NextFunction) {
  console.log("Auth middleware called" , req.body);
 try {
  const jwtHeader = req.headers["authorization"];
  const token = jwtHeader?.split(" ")[1]
  if(!token){
    res.status(400).json({
      message : "No token found"
    })
    return
  }

  const decoded = jwt.verify(token, JWT_SECRET) as { userId: string}
    if(!decoded){
        res.status(401).json({
            message : "Unauthorized"
        })
        return
    }
    req.userId = decoded.userId
    console.log("User ID:", req.userId);
    next()
 } catch (error) {
    res.status(500).json({
      message : "Invalid authorization"
    })
 }
}
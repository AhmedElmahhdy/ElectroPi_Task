import jwt from "jsonwebtoken"
import User from "../models/user/userSchema.js"

export const protect = async (req, res, next) => {
  let token
  const authHeader = req.headers.authorization || req.headers.Authorization || req.headers.token
  if (authHeader) {
    token = authHeader.split(" ")[1]
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, token missing" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id).select("-password")
    next()
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token failed", headers: req.headers.token })
  }
}

export const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next()
  } else {
    res.status(403).json({ message: "Admin access required" })
  }
}

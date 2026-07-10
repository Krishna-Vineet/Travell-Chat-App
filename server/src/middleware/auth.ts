import { getAuth } from "@clerk/express";
import type { Request, Response, NextFunction } from "express";
import { User } from "../modals/User";


export type AuthRequest = Request & {
    userId?: string,
}

export const protectRoute = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { isAuthenticated, userId : clerkId } = getAuth(req)   

        if (!isAuthenticated) {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        if (!clerkId) {
            return res.status(401).json({ message: 'Invalid Token' })
        }

        const user = await User.findOne({ clerkId });

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        req.userId = user?._id.toString();

        next();
  } catch (error) {
        console.error("Error in protectRoute Middleware");
        return res.status(500).json({ message: 'Internal App Error', error})
  }
}
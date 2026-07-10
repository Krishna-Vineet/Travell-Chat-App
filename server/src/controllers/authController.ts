import type { NextFunction, Request, Response } from "express"
import type { AuthRequest } from "../middleware/auth"
import { User } from "../modals/User"
import { clerkClient, getAuth } from "@clerk/express"

export const getMe = async (req: AuthRequest, res: Response, next:NextFunction) => {
    try {
        const userId = req.userId

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found "});
        }

        res.status(200).json(user);

    } catch (error) {
        // res.status(500).json({ message: "Internal Server Error" }) // It was without errorhandler
        res.status(500);
        next();              // this is using error handler
    }

}

export const authCallback = async (req: Request, res: Response, next:NextFunction) => {
    try {
        
        const {userId : clerkId} = getAuth(req);

        if (!clerkId) {
            return res.status(401).json({ message: "Unauthorised" })
        }

        let user = await User.findOne({clerkId})

        if (!user) {
            const clerkUser = await clerkClient.users.getUser(clerkId);

            user = await User.create({
                clerkId,
                name: clerkUser.fullName?.trim() || clerkUser.emailAddresses[0]?.emailAddress.split("@")[0] || "User",
                email: clerkUser.emailAddresses[0]?.emailAddress,
                avatar: clerkUser.imageUrl
            })
        }

        res.json(user)
    } catch (error) {
        return res.status(500);
        next();
    }
}
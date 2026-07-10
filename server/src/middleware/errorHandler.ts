import type { Response, Request, NextFunction } from "express";

export const errorHandler = (err:Error, req:Request, res:Response, _next:NextFunction) => {
    console.log("Error:", err.message)

    const statusCode: number = res.statusCode !== 200 ? Number(res.statusCode) : 500;

    res.status(statusCode).json({
        message: err.message || "Internal Server Error",
        ...(process.env.NODE_ENV === 'development' && {stack: err.stack})
    })
} 
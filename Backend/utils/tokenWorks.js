import jwt from "jsonwebtoken";

export const signUser = (userId, roles, res) => {
    const token = jwt.sign({id: userId, roles: roles}, process.env.JWT_SECRET, {
        expiresIn: '15d'
    })

    res.cookie("user", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite:"strict",
        secure: process.env.NODE_ENV !== "development"
    })
}
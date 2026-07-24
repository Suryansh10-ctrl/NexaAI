import jwt from "jsonwebtoken";

export function authUser(req, res, next) {
    console.log("========== AUTH ==========");
    console.log("Origin:", req.headers.origin);
    console.log("Cookie Header:", req.headers.cookie);
    console.log("Cookies:", req.cookies);

    const token = req.cookies.token;

    console.log("Token:", token);

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded:", decoded);

        req.user = decoded;
        next();
    } catch (err) {
        console.log("JWT Error:", err.message);

        return res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
    }
}

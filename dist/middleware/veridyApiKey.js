export function verifyApiKey(req, res, next) {
    const keyFromRequest = req.headers["x-api-key"];
    const validKey = process.env.ADMIN_KEY;
    if (!keyFromRequest || keyFromRequest !== validKey) {
        res.status(403).json({ error: "Forbidden. Invalid API key." });
        return;
    }
    next();
}

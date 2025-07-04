import { Request, Response, NextFunction } from "express";

export function verifyApiKey(req: Request, res: Response, next: NextFunction) {
  const keyFromRequest = req.headers["x-api-key"];
  const validKey = process.env.ADMIN_KEY;
  console.log(keyFromRequest);
  console.log(validKey);

  if (!keyFromRequest || keyFromRequest !== validKey) {
    console.log("we are here");
    res.status(403).json({ error: "Forbidden. Invalid API key." });
    return;
  }

  next();
}

import jwt from "jsonwebtoken";

export default (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ error: "Missing token." });
    }

    const token = req.headers.authorization.split(" ")[1];
    const secret = process.env.TOKEN_SECRET ?? process.env.JWT_SECRET;
    const decodedToken = jwt.verify(token, secret);
    const userId = decodedToken.id ?? decodedToken.user_id;

    req.auth = { userId };

    next();
  } catch (err) {
    res.status(401).json({
      error: "Requête non autorisée !",
    });
  }
};

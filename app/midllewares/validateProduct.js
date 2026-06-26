export default (req, res, next) => {
  const { name, quantity } = req.body;

  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ error: "Le nom du produit est requis." });
  }

  if (name.trim().length < 3 || name.trim().length > 40) {
    return res
      .status(400)
      .json({ error: "Le nom du produit doit contenir entre 3 et 40 caractères." });
  }

  if (quantity === undefined || quantity === null) {
    return res.status(400).json({ error: "La quantité est requise." });
  }

  if (!Number.isInteger(Number(quantity)) || Number(quantity) < 0) {
    return res
      .status(400)
      .json({ error: "La quantité doit être un entier positif ou nul." });
  }

  next();
};

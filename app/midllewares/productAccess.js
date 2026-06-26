import { prisma } from "../../app.js";

export default async (req, res, next) => {
  try {
    const product = await prisma.product.findUniqueOrThrow({
      where: { id: parseInt(req.params.id) },
    });

    if (req.auth.userId !== product.userId) {
      return res
        .status(403)
        .json({ error: "Unauthorized access to this product." });
    }

    req.product = product;
    next();
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Product not found." });
    }
    res.status(500).json({ error: "Internal server error." });
  }
};

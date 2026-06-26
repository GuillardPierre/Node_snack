import { prisma } from "../../app.js";
import { attachLinks } from "../helpers/hateoas.js";

export const getAllUserProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: { userId: req.auth.userId },
    });
    res.status(200).json(products.map((p) => attachLinks(req, p)));
  } catch (error) {
    res.status(500).send("Error fetching products: " + error.message);
  }
};

export const createUserProduct = async (req, res) => {
  const data = req.body;

  try {
    const product = await prisma.product.create({
      data: {
        name: data.name,
        quantity: data.quantity,
        userId: req.auth.userId,
      },
    });
    res.status(201).json(attachLinks(req, product));
  } catch (error) {
    res.status(500).send("Error creating product: " + error.message);
  }
};

export const updateUserProduct = async (req, res) => {
  const data = req.body;
  try {
    const product = await prisma.product.update({
      where: { id: parseInt(req.params.id), userId: req.auth.userId },
      data: {
        name: data.name,
        quantity: data.quantity,
      },
    });
    res.status(200).json(attachLinks(req, product));
  } catch (error) {
    res.status(500).send("Error updating product: " + error.message);
  }
};

export const deleteUserProduct = async (req, res) => {
  try {
    await prisma.product.delete({
      where: { id: parseInt(req.params.id), userId: req.auth.userId },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).send("Error deleting product: " + error.message);
  }
};

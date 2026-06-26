const buildProductLinks = (req, product) => {
  const baseUrl = `${req.protocol}://${req.get("host")}/api/products`;
  return {
    self: {
      href: `${baseUrl}/${product.id}`,
      rel: "self",
      method: "GET",
    },
    update: {
      href: `${baseUrl}/${product.id}`,
      rel: "update",
      method: "PUT",
    },
    delete: {
      href: `${baseUrl}/${product.id}`,
      rel: "delete",
      method: "DELETE",
    },
  };
};

export const attachLinks = (req, product) => ({
  ...product,
  _links: buildProductLinks(req, product),
});

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !emailRegex.test(email)) {
    return res
      .status(400)
      .json({ error: "Une adresse email valide est requise." });
  }

  if (!password || password.length < 8) {
    return res
      .status(400)
      .json({ error: "Le mot de passe doit contenir au moins 8 caractères." });
  }

  next();
};

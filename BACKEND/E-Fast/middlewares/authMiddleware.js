const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Récupérer le token du header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Accès refusé. Token manquant.' });
  }

  try {
    // Vérifier le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.utilisateur = decoded; // Ajouter les informations de l'utilisateur à la requête
    next();
  } catch (err) {
    res.status(400).json({ error: 'Token invalide.' });
  }
};

module.exports = authMiddleware;
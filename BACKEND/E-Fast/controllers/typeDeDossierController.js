const db = require('../database/database');

// Créer un nouveau type de dossier
const createTypeDeDossier = (req, res) => {
  const { nom, description } = req.body;

  // Validation des champs obligatoires
  if (!nom) {
    return res.status(400).json({ error: 'Le champ "nom" est requis.' });
  }

  const query = 'INSERT INTO type_de_dossier (nom, description) VALUES (?, ?)';
  const params = [nom, description || null];

  db.run(query, params, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID, nom, description });
  });
};

// Récupérer tous les types de dossier
const getAllTypesDeDossier = (req, res) => {
  db.all('SELECT * FROM type_de_dossier', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

// Récupérer un type de dossier par son ID
const getTypeDeDossierById = (req, res) => {
  const { id } = req.params;

  db.get('SELECT * FROM type_de_dossier WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Type de dossier non trouvé' });
    }
    res.json(row);
  });
};

// Mettre à jour un type de dossier
const updateTypeDeDossier = (req, res) => {
  const { id } = req.params;
  const { nom, description } = req.body;

  // Validation des champs obligatoires
  if (!nom) {
    return res.status(400).json({ error: 'Le champ "nom" est requis.' });
  }

  const query = 'UPDATE type_de_dossier SET nom = ?, description = ? WHERE id = ?';
  const params = [nom, description || null, id];

  db.run(query, params, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Type de dossier non trouvé' });
    }
    res.json({ id, nom, description });
  });
};

// Supprimer un type de dossier
const deleteTypeDeDossier = (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM type_de_dossier WHERE id = ?', [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Type de dossier non trouvé' });
    }
    res.json({ message: 'Type de dossier supprimé avec succès' });
  });
};

module.exports = {
  createTypeDeDossier,
  getAllTypesDeDossier,
  getTypeDeDossierById,
  updateTypeDeDossier,
  deleteTypeDeDossier,
};
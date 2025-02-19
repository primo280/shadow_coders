const db = require('../database/database');

// Créer une nouvelle salle
const createSalle = (req, res) => {
  const { nom, longitude, latitude, disponibilite } = req.body;

  if (!nom || longitude == null || latitude == null) {
    return res.status(400).json({ error: 'Les champs "nom", "longitude" et "latitude" sont requis.' });
  }

  const coordonnees = JSON.stringify({ longitude, latitude });

  const query = `
    INSERT INTO salle (nom, coordonnees, disponibilite)
    VALUES (?, ?, ?)
  `;
  const params = [nom, coordonnees, disponibilite !== undefined ? disponibilite : true];

  db.run(query, params, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID, nom, longitude, latitude, disponibilite });
  });
};

// Récupérer toutes les salles
const getAllSalles = (req, res) => {
  db.all('SELECT * FROM salle', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const salles = rows.map(row => ({
      id: row.id,
      nom: row.nom,
      coordonnees: JSON.parse(row.coordonnees),
      disponibilite: row.disponibilite === 1
    }));
    res.json(salles);
  });
};

// Récupérer une salle par son ID
const getSalleById = (req, res) => {
  const { id } = req.params;

  db.get('SELECT * FROM salle WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Salle non trouvée' });
    }
    res.json({
      id: row.id,
      nom: row.nom,
      coordonnees: JSON.parse(row.coordonnees),
      disponibilite: row.disponibilite === 1
    });
  });
};

// Mettre à jour une salle
const updateSalle = (req, res) => {
  const { id } = req.params;
  const { nom, longitude, latitude, disponibilite } = req.body;

  if (!nom || longitude == null || latitude == null) {
    return res.status(400).json({ error: 'Les champs "nom", "longitude" et "latitude" sont requis.' });
  }

  const coordonnees = JSON.stringify({ longitude, latitude });

  const query = `
    UPDATE salle
    SET nom = ?, coordonnees = ?, disponibilite = ?
    WHERE id = ?
  `;
  const params = [nom, coordonnees, disponibilite !== undefined ? disponibilite : true, id];

  db.run(query, params, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Salle non trouvée' });
    }
    res.json({ id, nom, longitude, latitude, disponibilite });
  });
};

// Supprimer une salle
const deleteSalle = (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM salle WHERE id = ?', [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Salle non trouvée' });
    }
    res.json({ message: 'Salle supprimée avec succès' });
  });
};

module.exports = {
  createSalle,
  getAllSalles,
  getSalleById,
  updateSalle,
  deleteSalle,
};

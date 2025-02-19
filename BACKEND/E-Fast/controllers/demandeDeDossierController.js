const db = require('../database/database');
const upload = require('../config/multerConfig');

// Créer une nouvelle demande de dossier avec fichiers
const createDemandeDeDossier = (req, res) => {
  const { utilisateur_id, type_de_dossier_id, description } = req.body;

  // Validation des champs obligatoires
  if (!utilisateur_id || !type_de_dossier_id) {
    return res.status(400).json({ error: 'Les champs "utilisateur_id" et "type_de_dossier_id" sont requis.' });
  }

  // Récupérer les chemins des fichiers téléchargés
  const fichiers = req.files ? req.files.map(file => file.path) : null;

  // Trouver l'ID du SG (utilisateur avec sg = true)
  db.get('SELECT id FROM utilisateurs WHERE sg = ?', [true], (err, sg) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!sg) {
      return res.status(404).json({ error: 'Aucun Secrétaire Général (SG) trouvé.' });
    }

    // Insérer la demande avec le statut "en_attente" et destinataire_id = SG
    const query = `
      INSERT INTO demande_de_dossier (utilisateur_id, type_de_dossier_id, description, fichiers, statut, destinataire_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const params = [utilisateur_id, type_de_dossier_id, description || null, fichiers ? fichiers.join(',') : null, 'en_attente', sg.id];

    db.run(query, params, function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID, utilisateur_id, type_de_dossier_id, description, fichiers, statut: 'en_attente', destinataire_id: sg.id });
    });
  });
};
const getAllDemandesDeDossier = (req, res) => {
  db.all('SELECT * FROM demande_de_dossier', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

// Récupérer une demande de dossier par son ID
const getDemandeDeDossierById = (req, res) => {
  const { id } = req.params;

  db.get('SELECT * FROM demande_de_dossier WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Demande de dossier non trouvée' });
    }
    res.json(row);
  });
};
const updateDemandeDeDossier = (req, res) => {
  const { id } = req.params;
  const { utilisateur_id, type_de_dossier_id, description, destinataire_id } = req.body;

  // Validation des champs obligatoires
  if (!utilisateur_id || !type_de_dossier_id) {
    return res.status(400).json({ error: 'Les champs "utilisateur_id" et "type_de_dossier_id" sont requis.' });
  }

  const query = `
    UPDATE demande_de_dossier
    SET utilisateur_id = ?, type_de_dossier_id = ?, description = ?, destinataire_id = ?
    WHERE id = ?
  `;
  const params = [utilisateur_id, type_de_dossier_id, description, destinataire_id || null, id];

  db.run(query, params, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Demande de dossier non trouvée' });
    }
    res.json({ id, utilisateur_id, type_de_dossier_id, description, destinataire_id });
  });
};

// Supprimer une demande de dossier
const deleteDemandeDeDossier = (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM demande_de_dossier WHERE id = ?', [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Demande de dossier non trouvée' });
    }
    res.json({ message: 'Demande de dossier supprimée avec succès' });
  });
};
const enregistrerActionHistorique = (demande_de_dossier_id, utilisateur_id, action) => {
  const query = `
    INSERT INTO historique_actions (demande_de_dossier_id, utilisateur_id, action)
    VALUES (?, ?, ?)
  `;
  const params = [demande_de_dossier_id, utilisateur_id, action];

  db.run(query, params, function (err) {
    if (err) {
      console.error('Erreur lors de l\'enregistrement de l\'action dans l\'historique :', err.message);
    }
  });
};
const getDemandesPourUtilisateur = (req, res) => {
  const { utilisateur_id } = req.params;
  console.log(utilisateur_id);

  db.all('SELECT * FROM demande_de_dossier WHERE destinataire_id = ?', [utilisateur_id], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

module.exports = {
  createDemandeDeDossier,
  getAllDemandesDeDossier,
  getDemandeDeDossierById,
  updateDemandeDeDossier,
  deleteDemandeDeDossier,
  getDemandesPourUtilisateur,
};
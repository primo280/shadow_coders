const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../database/database');

const loginUtilisateur = async (req, res) => {
    const { email, motDePasse } = req.body;
  
    // Vérifier si l'utilisateur existe
    db.get('SELECT * FROM utilisateurs WHERE email = ?', [email], async (err, utilisateur) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (!utilisateur) {
        res.status(404).json({ error: 'Utilisateur non trouvé' });
        return;
      }
  
      // Vérifier le mot de passe
      const motDePasseValide = await bcrypt.compare(motDePasse, utilisateur.motDePasse);
      if (!motDePasseValide) {
        res.status(401).json({ error: 'Mot de passe incorrect' });
        return;
      }
  
      // Générer un JWT
      const token = jwt.sign(
        { id: utilisateur.id, email: utilisateur.email },
        process.env.JWT_SECRET, // Clé secrète (à définir dans .env)
        { expiresIn: '1h' } // Durée de validité du token
      );
  
      // Renvoyer le token
      res.json({ token });
    });
  };

// Créer un nouvel utilisateur
const createUtilisateur = async (req, res) => {
  const {
    nom,
    email,
    motDePasse,
    matricule,
    etudiant,
    professeur,
    sg,
    da,
    dg,
    cs,
    si,
    dateDeNaissance,
    codeActivation,
    active,
  } = req.body;

  // Validation des champs obligatoires
  if (!nom || !email || !motDePasse || !matricule) {
    return res.status(400).json({ error: 'Les champs "nom", "email", "motDePasse" et "matricule" sont requis.' });
  }

  // Vérifier si l'email ou le matricule existe déjà
  db.get(
    'SELECT * FROM utilisateurs WHERE email = ? OR matricule = ?',
    [email, matricule],
    async (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (row) {
        if (row.email === email) {
          return res.status(400).json({ error: 'Cet email est déjà utilisé.' });
        }
        if (row.matricule === matricule) {
          return res.status(400).json({ error: 'Ce matricule est déjà utilisé.' });
        }
      }

      // Hacher le mot de passe
      const salt = await bcrypt.genSalt(10);
      const motDePasseHache = await bcrypt.hash(motDePasse, salt);

      // Insérer l'utilisateur dans la base de données
      const query = `
        INSERT INTO utilisateurs (
          nom, email, motDePasse, matricule, etudiant, professeur, sg, da, dg, cs, si, dateDeNaissance, codeActivation, active
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const params = [
        nom,
        email,
        motDePasseHache,
        matricule,
        etudiant || false,
        professeur || false,
        sg || false,
        da || false,
        dg || false,
        cs || false,
        si || false,
        dateDeNaissance || null,
        codeActivation || null,
        active || false,
      ];

      db.run(query, params, function (err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID, ...req.body });
      });
    }
  );
};

// Récupérer tous les utilisateurs
const getAllUtilisateurs = (req, res) => {
  db.all('SELECT * FROM utilisateurs', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

// Récupérer un utilisateur par son ID
const getUtilisateurById = (req, res) => {
  const { id } = req.params;

  db.get('SELECT * FROM utilisateurs WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
    res.json(row);
  });
};

// Mettre à jour un utilisateur
const updateUtilisateur = async (req, res) => {
  const { id } = req.params;
  const {
    nom,
    email,
    motDePasse,
    matricule,
    etudiant,
    professeur,
    sg,
    da,
    dg,
    cs,
    si,
    dateDeNaissance,
    codeActivation,
    active,
  } = req.body;

  // Vérifier si l'email ou le matricule existe déjà pour un autre utilisateur
  db.get(
    'SELECT * FROM utilisateurs WHERE (email = ? OR matricule = ?) AND id != ?',
    [email, matricule, id],
    async (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (row) {
        if (row.email === email) {
          return res.status(400).json({ error: 'Cet email est déjà utilisé.' });
        }
        if (row.matricule === matricule) {
          return res.status(400).json({ error: 'Ce matricule est déjà utilisé.' });
        }
      }

      // Hacher le mot de passe si fourni
      let motDePasseHache;
      if (motDePasse) {
        const salt = await bcrypt.genSalt(10);
        motDePasseHache = await bcrypt.hash(motDePasse, salt);
      }

      // Mettre à jour l'utilisateur
      const query = `
        UPDATE utilisateurs SET
          nom = ?,
          email = ?,
          motDePasse = COALESCE(?, motDePasse),
          matricule = ?,
          etudiant = ?,
          professeur = ?,
          sg = ?,
          da = ?,
          dg = ?,
          cs = ?,
          si = ?,
          dateDeNaissance = ?,
          codeActivation = ?,
          active = ?
        WHERE id = ?
      `;

      const params = [
        nom,
        email,
        motDePasseHache,
        matricule,
        etudiant || false,
        professeur || false,
        sg || false,
        da || false,
        dg || false,
        cs || false,
        si || false,
        dateDeNaissance || null,
        codeActivation || null,
        active || false,
        id,
      ];

      db.run(query, params, function (err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
          return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
        res.json({ id, ...req.body });
      });
    }
  );
};

// Supprimer un utilisateur
const deleteUtilisateur = (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM utilisateurs WHERE id = ?', [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
    res.json({ message: 'Utilisateur supprimé avec succès' });
  });
};

module.exports = {
  createUtilisateur,
  getAllUtilisateurs,
  getUtilisateurById,
  updateUtilisateur,
  deleteUtilisateur,
  loginUtilisateur,
};
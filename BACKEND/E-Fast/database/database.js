const sqlite3 = require('sqlite3').verbose();

// Connexion à la base de données SQLite
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err.message);
  } else {
    console.log('Connecté à la base de données SQLite.');
    db.run(`
      CREATE TABLE IF NOT EXISTS utilisateurs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        motDePasse TEXT NOT NULL,
        matricule INTEGER,
        etudiant BOOLEAN DEFAULT 0,
        professeur BOOLEAN DEFAULT 0,
        sg BOOLEAN DEFAULT 0,
        da BOOLEAN DEFAULT 0,
        dg BOOLEAN DEFAULT 0,
        cs BOOLEAN DEFAULT 0,
        si BOOLEAN DEFAULT 0,
        dateDeNaissance DATE,
        codeActivation INTEGER,
        active BOOLEAN DEFAULT 0
      )
    `);
    db.run(`
        CREATE TABLE IF NOT EXISTS type_de_dossier (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nom TEXT NOT NULL,
          description TEXT
        )
      `);
      db.run(`
        CREATE TABLE IF NOT EXISTS demande_de_dossier (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          utilisateur_id INTEGER NOT NULL,
          type_de_dossier_id INTEGER NOT NULL,
          description TEXT,
          fichiers TEXT,
          statut TEXT DEFAULT 'en_attente', -- Statut de la demande
          destinataire_id INTEGER, -- ID de l'utilisateur à qui la demande est destinée
          date_creation DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs (id),
          FOREIGN KEY (type_de_dossier_id) REFERENCES type_de_dossier (id),
          FOREIGN KEY (destinataire_id) REFERENCES utilisateurs (id)
        )
      `);
      db.run(`
  CREATE TABLE IF NOT EXISTS historique_actions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    demande_de_dossier_id INTEGER NOT NULL,
    utilisateur_id INTEGER NOT NULL, -- Utilisateur qui a effectué l'action
    action TEXT NOT NULL, -- Action effectuée (ex: "approuvee", "rejetee")
    date_action DATETIME DEFAULT CURRENT_TIMESTAMP, -- Date de l'action
    FOREIGN KEY (demande_de_dossier_id) REFERENCES demande_de_dossier (id),
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs (id)
  )
`);
db.run(`
    CREATE TABLE IF NOT EXISTS salle (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom TEXT NOT NULL,
        coordonnees TEXT NOT NULL, -- Stocke les coordonnées en JSON {"longitude": X, "latitude": Y}
        disponibilite BOOLEAN NOT NULL DEFAULT 1 -- 1 = disponible, 0 = non disponible
    )
`);

  }
});

module.exports = db;
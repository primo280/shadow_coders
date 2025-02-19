require('dotenv').config(); 
const express = require('express');
const bodyParser = require('body-parser');
const utilisateurRoutes = require('./routes/utilisateurRoutes');
const typeDeDossierRoutes = require('./routes/typeDeDossierRoutes');
const demandeDeDossierRoutes = require('./routes/demandeDeDossierRoutes');
const salleRoutes = require('./routes/salleRoutes');


const app = express();
const port = 3050;

// Middleware pour parser les requêtes JSON
app.use(bodyParser.json());

// Utiliser les routes des utilisateurs
app.use('/utilisateurs', utilisateurRoutes);
app.use('/types-de-dossier', typeDeDossierRoutes);
app.use('/demandes-de-dossier', demandeDeDossierRoutes);
app.use('/salles', salleRoutes);


app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API de gestion des dossiers !');
  });
  
  // Gestion des erreurs 404 (Route non trouvée)
  app.use((req, res) => {
    res.status(404).json({ error: 'Route non trouvée' });
  });
  
  // Gestion des erreurs globales
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  });
// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
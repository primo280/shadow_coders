const express = require('express');
const router = express.Router();
const demandeDeDossierController = require('../controllers/demandeDeDossierController');
const upload = require('../config/multerConfig');

// Créer une nouvelle demande de dossier avec fichiers
router.post('/', upload.array('fichiers', 5), demandeDeDossierController.createDemandeDeDossier);

// Récupérer toutes les demandes de dossier
router.get('/', demandeDeDossierController.getAllDemandesDeDossier);

// Récupérer une demande de dossier par son ID
router.get('/:id', demandeDeDossierController.getDemandeDeDossierById);

// Mettre à jour une demande de dossier
router.put('/:id', demandeDeDossierController.updateDemandeDeDossier);

// Supprimer une demande de dossier
router.delete('/:id', demandeDeDossierController.deleteDemandeDeDossier);
// Récupérer les demandes pour un utilisateur
router.get('/pour-utilisateur/:utilisateur_id', demandeDeDossierController.getDemandesPourUtilisateur);

module.exports = router;
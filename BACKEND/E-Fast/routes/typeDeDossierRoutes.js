const express = require('express');
const router = express.Router();
const typeDeDossierController = require('../controllers/typeDeDossierController');

// Créer un nouveau type de dossier
router.post('/', typeDeDossierController.createTypeDeDossier);

// Récupérer tous les types de dossier
router.get('/', typeDeDossierController.getAllTypesDeDossier);

// Récupérer un type de dossier par son ID
router.get('/:id', typeDeDossierController.getTypeDeDossierById);

// Mettre à jour un type de dossier
router.put('/:id', typeDeDossierController.updateTypeDeDossier);

// Supprimer un type de dossier
router.delete('/:id', typeDeDossierController.deleteTypeDeDossier);

module.exports = router;
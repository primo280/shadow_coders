const express = require('express');
const router = express.Router();
const salleController = require('../controllers/salleController');

// Créer une nouvelle salle
router.post('/', salleController.createSalle);

// Récupérer toutes les salles
router.get('/', salleController.getAllSalles);

// Récupérer une salle par son ID
router.get('/:id', salleController.getSalleById);

// Mettre à jour une salle
router.put('/:id', salleController.updateSalle);

// Supprimer une salle
router.delete('/:id', salleController.deleteSalle);

module.exports = router;
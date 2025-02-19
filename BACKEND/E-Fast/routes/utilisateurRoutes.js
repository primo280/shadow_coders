const express = require('express');
const router = express.Router();
const utilisateurController = require('../controllers/utilisateurController');

// Créer un nouvel utilisateur
router.post('/', utilisateurController.createUtilisateur);
router.post('/login', utilisateurController.loginUtilisateur);

// Récupérer tous les utilisateurs
router.get('/', utilisateurController.getAllUtilisateurs);

// Récupérer un utilisateur par son ID
router.get('/:id', utilisateurController.getUtilisateurById);

// Mettre à jour un utilisateur
router.put('/:id', utilisateurController.updateUtilisateur);

// Supprimer un utilisateur
router.delete('/:id', utilisateurController.deleteUtilisateur);

module.exports = router;
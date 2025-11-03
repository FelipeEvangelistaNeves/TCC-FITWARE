const express = require('express');
const router = express.Router();

const { dataDesafio } = require('../controllers/desafioController'); 

// Rota GET para /api/desafios
router.get('/', async (req, res) => {
    try {
        const desafios = await dataDesafio(); 
        
        return res.status(200).json(desafios); 
        
    } catch (error) {
        console.error("Erro na rota GET /desafios:", error);
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
});

module.exports = router;
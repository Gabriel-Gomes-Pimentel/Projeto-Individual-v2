var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController");

//Recebendo os dados do html e direcionando para a função registrarRespostas de quizController.js

router.post('/registrarRespostas', function (req, res) {
    quizController.registrarRespostas(req, res);
})


router.put("/finalizarQuiz/:idUsuario", function (req,res) {
    quizController.finalizarQuiz(req,res);
})

router.get("/distribuicao", function (req, res) {
    quizController.distribuicao(req, res);
});

router.get("/interesses", function (req,res) {
    quizController.interesses(req,res);
})

module.exports = router;
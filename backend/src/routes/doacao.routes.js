const express = require("express");
const router = express.Router();
const doacaoController = require("../controllers/doacao.controller");

router.get("/", doacaoController.listar);
router.post("/", doacaoController.criar);
router.put("/:id", doacaoController.atualizar);
router.delete("/:id", doacaoController.deletar);

module.exports = router;

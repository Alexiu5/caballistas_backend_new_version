"use-strict";

const express = require("express");
const Usuario = require("./usuario.controller");
const router = express.Router();

router.post("/", Usuario.register);
router.put("/:idCliente", Usuario.update);
router.delete("/:idCliente", Usuario.deleteUser);
router.get("/:idCliente", Usuario.findById);
router.get("/email/:email", Usuario.findByEmail);
router.get(
    "/documento/:tipoDocumento&:numeroDocumento",
    Usuario.findByDocument
);

module.exports = router;

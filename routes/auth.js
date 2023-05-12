const { Router } = require("express");
const { crearUsuario, loginUsuario, buscarPuntos, guardarPunto, eliminarPunto, validarToken } = require("../controllers/auth.controller");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

//Crear usuario
router.post( "/new", [
    check("name", "El nombre es obligatorio").notEmpty(),
    check("password", "La contraseña es obligatorio").isLength({ min: 6 }),
    validarCampos
], crearUsuario )

//Login de ususario
router.post( "/",  [
    check("name", "El nombre es obligatorio"),
    check("password", "La contraseña es obligatorio").isLength({ min: 6 }),
], loginUsuario )

//Validar y revalidar token
router.get( "/renew", validarJWT, validarToken )

//Buscar puntos
router.post( "/searchPuntos",  [
    check("user", "Nombre de usuario obligatorio")
], buscarPuntos );

//Crear punto
router.post( "/newPunto",  [
    check("user", "Nombre de usuario obligatorio"),
    check("recordid", "Id del punto obligatorio")
], guardarPunto );

//Borrar punto
router.post( "/deletePunto",  [
    check("user", "Nombre de usuario obligatorio"),
    check("recordid", "Id del punto obligatorio")
], eliminarPunto );

//Revalidar token
/* router.post( "/validarToken",  [
    check("token", "Token del usuario obligatorio")
], revalidarToken ); */


module.exports = router
const { validationResult } = require("express-validator");
const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");
const Punto = require("../models/Punto");


const crearUsuario = async ( req, res ) => {

    const { name, password } = req.body;

    try {
        
        //Verificar el nombre
        let usuario = await Usuario.findOne({ name })

        if( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: "Un usuario ya exite con ese nombre"
            });
        }

        //Crear usuario
        const dbUser = new Usuario( req.body );

        //Hashear la contraseña
        const salt = bcrypt.genSaltSync(10);
        dbUser.password = bcrypt.hashSync( password, salt )

        //Generar el JWT
        const token = await generarJWT( dbUser.id, name );

        //Crear usuario de BD
        await dbUser.save();

        //Generar respuesta exitosa
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            name,
            token
        })

    } catch (error) { 
        console.log( error )
        return res.status(500).json({
            ok: false,
            msg: "Fallo en el servidor"
        })
    }
    
}

const loginUsuario = async ( req, res ) => {

    const { name, password } = req.body;

    try {

        const dbUser = await Usuario.findOne({ name });

        if( !dbUser ) {
            return res.status(400).json({
                ok: false,
                msg: "Credenciales inválidas"
            })
        }
        

        //Comprobar que coinicida la contraseña
        const validPassword = bcrypt.compareSync( password, dbUser.password );

        if( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: "Credenciales inválidas"
            })
        }

        //Generar JWT
        const token = await generarJWT( dbUser.id, dbUser.name );

        //Respuesta
        return res.json({
            ok: true,
            uid: dbUser.uid,
            name: dbUser.name,
            recordid: dbUser.recordid,
            token: token
        })
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Fallo en el servidor"
        })
    }
} 

const revalidarToken = async ( req, res ) => {

    const { uid, name } = req.body;
    const token = req.header("x-token");
    const newToken = await generarJWT( uid, name );

    if( !token ) {
        return res.json({
            ok: false,
            msg: "Token no válido"
        })
    }

    return res.json({
        ok: true,
        uid,
        name,
        token: newToken
    })
}


//TODO: completar buscarPuntos
const buscarPuntos = async ( req, res ) => {

    const { name, recordid } = req.body;

    try {
        
        let usuario

        if( recordid ) {
            usuario = await Usuario.find({  $and: [
                { name },
                {
                  $or: [
                    { recordid: { $in: recordid }},
                    { recordid: { $exists: false } }
                  ]
                }
              ] });
        } else {
            usuario = await Usuario.findOne({ name })
        }
        

        if( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: "No se han encontrado usuario"
            });
        }

        return res.status(201).json({
            ok: true,
            usuario
        })

    } catch (error) {
        console.log( error )
        return res.status(500).json({
            ok: false,
            msg: "Fallo en el servidor"
        })
    }

}

const guardarPunto = async ( req, res ) => {
    
    const { name, recordid } = req.body;

    try {
        
        //let usuario = await Usuario.findOne({ name, recordid });
        let usuario = await Usuario.updateOne({ name }, { $addToSet: { recordid: recordid } })
        if( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: "Usuario no encontrado"
            });
        }

        return res.status(201).json({
            ok: true,
            name,
            recordid
        })

    } catch (error) {
        console.log( error )
        return res.status(500).json({
            ok: false,
            msg: "Fallo en el servidor"
        })
    }
}

const eliminarPunto = async ( req, res ) => {
    const { name, recordid } = req.body;

    try {
        
        //let usuario = await Usuario.findOne({ name, recordid });
        let usuario = await Usuario.updateOne({ name }, { $pull: { recordid: recordid } })
        if( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: "Usuario no encontrado"
            });
        }

        return res.status(201).json({
            ok: true,
            usuario
        })

    } catch (error) {
        console.log( error )
        return res.status(500).json({
            ok: false,
            msg: "Fallo en el servidor"
        })
    }
}



module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
    buscarPuntos,
    guardarPunto,
    eliminarPunto
}
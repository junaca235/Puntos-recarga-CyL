const { Schema, model } = require("mongoose");


const PuntoSchema = Schema({
    id: {
        type: String,
        require: true,
        unique: true
    },
    name:{
        type: String,
        require: true
    },
    recordid: {
        type: String,
        require: true
    }/* ,
    fields: {
        dms: {
            type: String
        },
        tipo: {
            type: String
        },
        operador: {
            type: String
        },
        direccion: {
            type: String
        },
        dd: {
            type: Array
        },
        no: {
            type: String
        },
        nombre: {
            type: String
        }
    },
    geometry: {
        coodinates: {
            type: Array
        }
    } */
})

module.exports = model("Punto", PuntoSchema);
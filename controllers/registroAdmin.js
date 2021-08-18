const model = require("../models/administradores");
const sha1 = require("sha1");
const {v4:uid} = require("uuid");
const Email = require("../class/emailRegistro");
const serviceCorreo = require("../services/emailRegistro");

const create = async (req, res) => {
    const emailClass = new Email();
    const body = req.body;
    const obj = {
        nombre: body.nombre,
        apellido: body.apellido,
        email: body.email,
        password: sha1(body.password),
        rol: body.rol,
        confirmacion_email: uid()
    };

    try {
        const registro = await model.create(obj);
        const enviarCorreo = await emailClass.enviarEmail(obj.email, serviceCorreo.confirmacionCorreo(obj.nombre, obj.apellido, "registroAdmin", obj.confirmacion_email));

        res.json({
            estado: "Success",
            mensaje: registro,
            correo: enviarCorreo
        });

    } catch (error) {
        const enviarCorreo = await emailClass.enviarEmail(obj.email,serviceCorreo.registroFallido);
        res.json({
            estado: "Error",
            mensaje: error,
            correo: enviarCorreo
        })
    };  
};

const verify = async (req, res) => {
    try {
        const {uid} = req.params;
        const verifyUser = await model.confirmStatus(uid);
        res.json({
            estado: "Success",
            mensaje: "Registro completado con éxito",
            verifyUser
        })
    } catch (error) {
        res.json({
            estado: "Error",
            mensaje: error
        })
    };
};

module.exports = {create, verify};
const model = require("../../models/usuarios");
const sha1 = require("sha1");
const serviceImg = require("../../services/uploadImg");

const single = async (req, res) => {
    const id = req.id;
    try {
        const usuario = await model.getSingle(id);
        
        if (usuario.length != 0) {
            res.json({
                estado: "Success",
                mensaje: usuario
            });
        } else {
            res.json({
                estado: "Success",
                mensaje: `No se encontró ningún usuario con ID: ${id}`
            });
        };

    } catch (error) {
        res.json({
            estado: "Error",
            mensaje: error
        })
    };
};

const getImg = async (req, res) => {
    const id = req.id;
    try {
        const imgName = await model.getImg(id);
        const img = serviceImg.getImg(imgName[0].avatar);
        if (img.estado == "Success") {
            res.json({
                estado: "Success",
                mensaje: img
            });
        } else {
            res.json({
                estado: "Success",
                mensaje: "No existe dicha imagen"
            });
        }
    } catch (error) {
        res.json({
            estado: "Error",
            mensaje: error
        });
    }
}

const modify = async (req, res) => {
    const obj = req.body;
    const id = req.id;
    let pass;
    console.log(obj)
    console.log(id)

    try {
        const modificar = await model.modify(obj, id);

        if (obj.password != null) {
            pass = await model.modifyPassword(sha1(obj.password), id)
        };

        if (modificar.affectedRows != 0) {
            res.json({
                estado: "Success",
                mensaje: modificar
            });
        } else if (pass.affectedRows != 0) {
            res.json({
                estado: "Success",
                mensaje: pass
            });
        } else {
            res.json({
                estado: "Success",
                mensaje: `No se encontró ningún usuario con ID: ${id}`
            });
        };
        
    } catch (error) {
        res.json({
            estado: "Error",
            mensaje: error
        });
    };
};

const del = async (req, res) => {
    const id = req.id;

    try {
        const borrar = await model.del(id);
        
        if (borrar.affectedRows != 0) {
            res.json({
                estado: "Success",
                mensaje: borrar
            });
        } else {
            res.json({
                estado: "Success",
                mensaje: `No se encontró ningún usuario con ID: ${id}`
            });
        };

    } catch (error) {
        res.json({
            estado: "Error",
            mensaje: error
        });
    };
};

module.exports = {single, getImg, modify, del};
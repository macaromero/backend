const model = require("../../models/clases");

const all = async (req, res) => {
    try {
        const clases = await model.get();   
        res.json({
            estado: "Success",
            mensaje: clases});
    } catch (error) {
        res.json({
            estado: "Error",
            mensaje: error
        });
    };
};

const single = async (req, res) => {
    const id = req.params.id;

    try {
        const clase = await model.getSingle(id);
        if (clase.length != 0) {
            res.json({
                estado: "Success",
                mensaje: clase
            });
        } else {
            res.json({
                estado: "Success",
                mensaje: `No se encontró ninguna clase con ID: ${id}`
            });
        };

    } catch (error) {
        res.json({
            estado: "Error",
            mensaje: error
        });
    };
};

const getByModalidad = async (req, res) => {
    try {
        const clases = await model.get();
        const {modalidad} = req.params;

        if (modalidad === "virtual" || modalidad === "presencial" || modalidad === "a-demanda") {
            const porModalidad = () => {
                const clasesPorModalidad = [];
                for (let i = 0; i < clases.length; i++) {
                    if (clases[i].modalidad.toLowerCase().replace(" ","-") === modalidad) {
                        clasesPorModalidad.push(clases[i]);
                    };
                };
                return clasesPorModalidad;
            };
    
            const byModalidad = porModalidad();
            res.json({
                estado: "Success",
                mensaje: byModalidad
            });
        } else {
            res.json({
                estado: "Success", 
                mensaje: "No ingresaste una modalidad existente"
            });
        };
        
    } catch (error) {
        res.json({
            estado: "Error",
            mensaje: error
        });
    };
};


const create = async (req, res) => {
    const obj = req.body;

    try {
        const nueva = await model.create(obj);
        res.json({
            estado: "Success",
            mensaje: nueva});
    } catch (error) {
        res.json({
            estado: "Error",
            mensaje: error
        });
    };
};

const modify = async (req, res) => {
    const obj = req.body;
    const {id} = req.params;

    try {
        const modificar = await model.modify(obj, id);

        if (modificar.affectedRows != 0) {
            res.json({
                estado: "Success",
                mensaje: modificar
            });
        } else {
            res.json({
                estado: "Success",
                mensaje: `No se encontró ninguna clase con ID: ${id}`
            });
        };

    } catch (error) {
        res.json({
            estado: "Error",
            mensaje: error
        });
    };
};

const enable = async (req, res) => {
    const {id} = req.params;
    
    try {
        const habilitar = await model.enable(id);

        if (habilitar.affectedRows != 0) {
            res.json({
                estado: "Success",
                mensaje: habilitar
            });
        } else {
            res.json({
                estado: "Success",
                mensaje: `No se encontró ninguna clase con ID: ${id}`
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
    const {id} = req.params;
    
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
                mensaje: `No se encontró ninguna clase con ID: ${id}`
            });
        };
    } catch (error) {
        res.json({
            estado: "Error",
            mensaje: error
        });
    };
};

module.exports = {all, single, getByModalidad, create, modify, enable, del};
const model = require("../../models/horarios");

const all = async (req, res) => {
    try {
        const horarios = await model.get();
        res.json({
            estado: "Success",
            mensaje: horarios 
        })
    } catch (error) {
        res.json({
            estado: "Error",
            mensaje: error
        })
    };
};

const allHoras = async (req, res) => {
    try {
        const horas = await model.getHoras();
        res.json({
            estado: "Success",
            mensaje: horas 
        })
    } catch (error) {
        res.json({
            estado: "Error",
            mensaje: error
        })
    };
};

const single = async (req, res) => {
    const id = req.params.id;

    try {
        const horario = await model.getSingle(id);
        if (horario.length === 0) {
            res.json({
                estado: "Success",
                mensaje: `No se encontró horario con ID: ${id}`
            })
        } else {
            res.json({
                estado: "Success", 
                mensaje: horario
            })
        };
        
    } catch (error) {
        res.json({
            estado: "Error",
            mensaje: error
        })
    };
};

const create = async (req, res) => {
    const obj = req.body;

    try {
        const nuevo = await model.create(obj);
        res.json({
            estado: "Success",
            mensaje: nuevo});
    } catch (error) {
        res.json({
            estado: "Error",
            mensaje: error
        });
    };
};

const createHoras = async (req, res) => {
    const obj = req.body;

    try {
        const nuevo = await model.createHoras(obj);
        res.json({
            estado: "Success",
            mensaje: nuevo});
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
                mensaje: `No se encontró ningún horario con ID: ${id}`
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
                mensaje: `No se encontró ningún horario con ID: ${id}`
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
                mensaje: `No se encontró ningún horario con ID: ${id}`
            });
        };

    } catch (error) {
        res.json({
            estado: "Error",
            mensaje: error
        });
    };
};


module.exports = {all, allHoras, single, create, createHoras, modify, enable, del}
const model = require("../models/clases");
const modelPrecios = require("../models/precios");

const all = async (req, res) => {
    try {
        const clases = await model.get();
       
        res.json({
            estado: "Success",
            mensaje: clases,
            params: req.params
        });

    } catch (error) {
        console.log(error)
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
                mensaje: clase,
                params: req.params
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

        if (modalidad === "virtual" || modalidad === "presencial") {
            const porModalidad = () => {
                const clasesPorModalidad = [];
                for (let i = 0; i < clases.length; i++) {
                    if (clases[i].modalidad.toLowerCase() === modalidad && clases[i].modalidad != "A demanda") {
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


module.exports = {all, single, getByModalidad};
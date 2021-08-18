const model = require("../../models/ordenes");

const all = async (req, res) => {
    try {
        const ordenes = await model.get();
        res.json({
            estado: "Success",
            mensaje: ordenes});
    } catch (error) {
        res.json({
            estado: "Error",
            mensaje: error
        });
    };
};

const allByUserId = async (req, res) => {
    const id = req.params.id;
    try {
        const ordenesPorId = await model.getByUserId(id);
        if (ordenesPorId.length != 0) {
            res.json({
                estado: "Success",
                mensaje: ordenesPorId
            });
        } else {
            res.json({
                estado: "Success",
                mensaje: `No se encontró ninguna orden para el usuario con ID: ${id}`
            });
        }
        
    } catch (error) {
        res.json({
            estado: "Error",
            mensaje: error
        });
    };
};

const singleOrder = async (req, res) => {
    const id = req.params.id;

    try {
        const orden = await model.getSingleOrder(id);

        if (orden.length != 0) {
            res.json({
                estado: "Success",
                mensaje: orden
            });
        } else {
            res.json({
                estado: "Success",
                mensaje: `No se encontró la orden con ID: ${id}`
            });
        }
        
    } catch (error) {
        res.json({
            estado: "Error.",
            mensaje: error
        });
    };
};

const singleOrderDetail = async (req, res) => {
    const id = req.params.id;

    try {
        const ordenDetalle = await model.getSingleOrderDetail(id);
        if (ordenDetalle.length != 0) {
            res.json({
                estado: "Success",
                mensaje: ordenDetalle
            });
        } else {
            res.json({
                estado: "Success",
                mensaje: `No se encontró orden con el ID: ${id}`
            });
        }

    } catch (error) {
        res.json({
            estado: "Error",
            mensaje: error
        });
    };
};

module.exports = {all, allByUserId, singleOrder, singleOrderDetail};
const model = require("../../models/ordenes");
const {crearOrden} = require("../../services/nuevaOrden");

const all = async (req, res) => {
    const id = req.id;
    try {
        const ordenes = await model.getByUserId(id);
        if (ordenes.length != 0) {
            res.json({
                estado: "Success",
                mensaje: ordenes
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
    const userId = req.id;

    try {
        const orden = await model.getSingleOrderByUserId(id, userId);

        if (orden.length != 0) {
            res.json({
                estado: "Success",
                mensaje: orden
            });
        } else {
            res.json({
                estado: "Success",
                mensaje: `No se encontró ninguna orden con el ID: ${id} para el usuario con ID: ${userId}`
            });
        };

    } catch (error) {
        res.json({
            estado: "Error",
            mensaje: error
        });
    };
};

const singleOrderDetail = async (req, res) => {
    const id = req.params.id;
    const userId = req.id;

    try {
        const ordenDetalle = await model.getSingleOrderDetailByUserId(id, userId);

        if (ordenDetalle.length != 0) {
            res.json({
                estado: "Success",
                mensaje: ordenDetalle
            }); 
        } else {
            res.json({
                estado: "Success",
                mensaje: `No se encontró ninguna orden con el ID: ${id} para el usuario con ID: ${userId}`
            });
        }

    } catch (error) {
        res.json({
            estado: "Error",
            mensaje: error
        });
    };
};

const create = async (req, res) => {
    const carrito = req.body;
    const usuario = req.id;

    try {
        const orden = await model.createOrder(usuario);
        const id_orden_detalle = await crearOrden(carrito, orden.insertId);

        res.json({
                estado: "Success",
                mensaje: orden,
                orden_detalle: id_orden_detalle,
                id_orden: orden.insertId
            });

    } catch (error) {
        console.log(error)
        res.json({
            estado: "Error",
            mensaje: error
        });
    };
};

const modifyOrderDetail = async (req, res) => {
    const obj = req.body;
    const {id} = req.params;

    try {
        const modificar = await model.modifyOrderDetail(obj, id);
        
        if (modificar.affectedRows != 0) {
            res.json({
                estado: "Success",
                mensaje: modificar
            });
        } else {
            res.json({
                estado: "Success",
                mensaje: `No se encontró ninguna orden con ID: ${id}`
            });
        };

    } catch (error) {
        res.json({
            estado: "Error",
            mensaje: error
        });
    };

};

const enableOrder = async (req, res) => {
    const {id} = req.params;
    
    try {
        const habilitar = await model.enableOrder(id);

        if (habilitar.affectedRows != 0) {
            res.json({
                estado: "Success",
                mensaje: habilitar
            });
        } else {
            res.json({
                estado: "Success",
                mensaje: `No se encontró ninguna orden con ID: ${id}`
            });
        };
        
    } catch (error) {
        res.json({
            estado: "Error",
            mensaje: error
        });
    };
};

const delOrderDetail = async (req, res) => {
    const {id} = req.params;
    
    try {
        const borrar = await model.delOrderDetail(id);

        if (borrar.affectedRows != 0) {
            res.json({
                estado: "Success",
                mensaje: borrar
            });
        } else {
            res.json({
                estado: "Success",
                mensaje: `No se encontró ninguna orden con ID: ${id}`
            });
        };

    } catch (error) {
        res.json({
            estado: "Error",
            mensaje: error
        });
    };
};


module.exports = {all, singleOrder, singleOrderDetail, create, modifyOrderDetail, enableOrder, delOrderDetail};

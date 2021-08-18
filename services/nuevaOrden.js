const model = require("../models/ordenes");

const crearOrden = async (carrito, insertId) => {
    const createOrderDetail = [];
    const id_orden_detalle = [];
    try {
        for (let i = 0; i < carrito.length; i++) {
            const obj = {
                id_orden: insertId,
                id_clase: carrito[i].id_clase,
                id_precio: carrito[i].id_precio,
                frecuencia: carrito[i].frecuencia
            };
            createOrderDetail.push(await model.createOrderDetail(obj));
        }

        for (let i = 0; i < createOrderDetail.length; i++) {
            id_orden_detalle.push(createOrderDetail[i].insertId)
        }
        return id_orden_detalle

    } catch (error) {
        console.log(error)
    }
    
};

module.exports = {crearOrden}
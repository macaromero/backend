const pool = require("../bin/db_connection");
const T_ORDENES = "ordenes";
const T_ORDENES_DETALLES = "ordenes_detalles";
const T_MODALIDADES = "modalidades";
const T_USUARIOS = "usuarios";
const T_CLASES = "clases";
const T_HORARIOS = "horarios";

const get = () => 
    pool
        .query("SELECT o.id_orden, o.id_usuario, u.nombre, u.apellido, u.email, od.id_orden_detalle, od.id_clase, m.tipo as modalidad, h.dia, h.id_hora, h.hora_inicio, h.hora_fin, od.frecuencia FROM ?? AS o JOIN ?? AS od ON o.id_orden = od.id_orden JOIN ?? AS u ON o.id_usuario = u.id_usuario JOIN ?? AS c ON od.id_clase = c.id_clase JOIN ?? AS h ON c.id_horario = h.id_horario JOIN ?? AS m ON c.id_modalidad = m.id_modalidad WHERE o.habilitado = ? AND u.habilitado = ? AND c.habilitado = ? AND h.habilitado = ?", [T_ORDENES, T_ORDENES_DETALLES, T_USUARIOS, T_CLASES, T_HORARIOS, T_MODALIDADES, 1, 1, 1, 1])
        .then((result) => result)
        .catch((e) => e);

const getByUserId = (id) =>
    pool
        .query("SELECT o.id_orden, o.id_usuario, u.nombre, u.apellido, u.email, od.id_orden_detalle, od.id_clase, m.tipo as modalidad, h.dia, h.id_hora, h.hora_inicio, h.hora_fin, od.frecuencia FROM ?? AS o JOIN ?? AS od ON o.id_orden = od.id_orden JOIN ?? AS u ON o.id_usuario = u.id_usuario JOIN ?? AS c ON od.id_clase = c.id_clase JOIN ?? AS h ON c.id_horario = h.id_horario JOIN ?? AS m ON c.id_modalidad = m.id_modalidad WHERE o.habilitado = ? AND u.habilitado = ? AND c.habilitado = ? AND h.habilitado = ? AND o.id_usuario = ?", [T_ORDENES, T_ORDENES_DETALLES, T_USUARIOS, T_CLASES, T_HORARIOS, T_MODALIDADES, 1, 1, 1, 1, id])
        .then((result) => result)
        .catch((e) => e);

const getSingleOrder = (id) => 
    pool
        .query("SELECT o.id_orden, o.id_usuario, u.nombre, u.apellido, u.email, od.id_orden_detalle, od.id_clase, m.tipo as modalidad, h.dia, h.id_hora, h.hora_inicio, h.hora_fin, od.frecuencia FROM ?? AS o JOIN ?? AS od ON o.id_orden = od.id_orden JOIN ?? AS u ON o.id_usuario = u.id_usuario JOIN ?? AS c ON od.id_clase = c.id_clase JOIN ?? AS h ON c.id_horario = h.id_horario JOIN ?? AS m ON c.id_modalidad = m.id_modalidad WHERE o.habilitado = ? AND u.habilitado = ? AND c.habilitado = ? AND h.habilitado = ? AND o.id_orden = ?", [T_ORDENES, T_ORDENES_DETALLES, T_USUARIOS, T_CLASES, T_HORARIOS, T_MODALIDADES, 1, 1, 1, 1, id])
        .then((result) => result)
        .catch((e) => e);
    
const getSingleOrderByUserId = (id, userId) => 
    pool
        .query("SELECT o.id_orden, o.id_usuario, u.nombre, u.apellido, u.email, od.id_orden_detalle, od.id_clase, m.tipo as modalidad, h.dia, h.id_hora, h.hora_inicio, h.hora_fin, od.frecuencia FROM ?? AS o JOIN ?? AS od ON o.id_orden = od.id_orden JOIN ?? AS u ON o.id_usuario = u.id_usuario JOIN ?? AS c ON od.id_clase = c.id_clase JOIN ?? AS h ON c.id_horario = h.id_horario JOIN ?? AS m ON c.id_modalidad = m.id_modalidad WHERE o.habilitado = ? AND u.habilitado = ? AND c.habilitado = ? AND h.habilitado = ? AND o.id_orden = ? AND o.id_usuario = ?", [T_ORDENES, T_ORDENES_DETALLES, T_USUARIOS, T_CLASES, T_HORARIOS, T_MODALIDADES, 1, 1, 1, 1, id, userId])
        .then((result) => result)
        .catch((e) => e);

const getSingleOrderDetail = (id) => 
    pool
        .query("SELECT o.id_orden, o.id_usuario, u.nombre, u.apellido, u.email, od.id_orden_detalle, od.id_clase, m.tipo as modalidad, h.dia, h.id_hora, h.hora_inicio, h.hora_fin, od.frecuencia FROM ?? AS o JOIN ?? AS od ON o.id_orden = od.id_orden JOIN ?? AS u ON o.id_usuario = u.id_usuario JOIN ?? AS c ON od.id_clase = c.id_clase JOIN ?? AS h ON c.id_horario = h.id_horario JOIN ?? AS m ON c.id_modalidad = m.id_modalidad WHERE o.habilitado = ? AND u.habilitado = ? AND c.habilitado = ? AND h.habilitado = ? AND od.id_orden_detalle = ?", [T_ORDENES, T_ORDENES_DETALLES, T_USUARIOS, T_CLASES, T_HORARIOS, T_MODALIDADES, 1, 1, 1, 1, id])
        .then((result) => result)
        .catch((e) => e);

const getSingleOrderDetailByUserId = (id, userId) => 
    pool
        .query("SELECT o.id_orden, o.id_usuario, u.nombre, u.apellido, u.email, od.id_orden_detalle, od.id_clase, m.tipo as modalidad, h.dia, h.id_hora, h.hora_inicio, h.hora_fin, od.frecuencia FROM ?? AS o JOIN ?? AS od ON o.id_orden = od.id_orden JOIN ?? AS u ON o.id_usuario = u.id_usuario JOIN ?? AS c ON od.id_clase = c.id_clase JOIN ?? AS h ON c.id_horario = h.id_horario JOIN ?? AS m ON c.id_modalidad = m.id_modalidad WHERE o.habilitado = ? AND u.habilitado = ? AND c.habilitado = ? AND h.habilitado = ? AND od.id_orden_detalle = ? AND o.id_usuario = ?", [T_ORDENES, T_ORDENES_DETALLES, T_USUARIOS, T_CLASES, T_HORARIOS, T_MODALIDADES, 1, 1, 1, 1, id, userId])
        .then((result) => result)
        .catch((e) => e);

const createOrderDetail = (obj) =>
    pool
        .query("INSERT INTO ?? SET ?", [T_ORDENES_DETALLES, obj])
        .then((result) => result)
        .catch((e) => e);

const createOrder = (usuario) =>
    pool
        .query("INSERT INTO ?? (id_usuario) VALUES (?)", [T_ORDENES, usuario])
        .then((result) => result)
        .catch((e) => e);

const modifyOrderDetail = (obj, id) =>
    pool
        .query("UPDATE ?? SET ? WHERE id_orden_detalle = ?", [T_ORDENES_DETALLES, obj, id])
        .then((result) => result)
        .catch((e) => e);

const enableOrder = (id) =>
    pool
        .query("UPDATE ?? SET habilitado = ? WHERE id_orden = ?", [T_ORDENES, 1, id])
        .then((result) => result)
        .catch((e) => e);

const delOrderDetail = (id) =>
    pool
        .query("UPDATE ?? SET habilitado = ? WHERE id_orden_detalle = ?", [T_ORDENES_DETALLES, 0, id])
        .then((result) => result)
        .catch((e) => e);

module.exports = {get, getByUserId, getSingleOrder, getSingleOrderByUserId, getSingleOrderDetail, getSingleOrderDetailByUserId, createOrderDetail, createOrder, modifyOrderDetail, enableOrder, delOrderDetail};
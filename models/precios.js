const pool = require ("../bin/db_connection");
const T_PRECIOS = "precios";
const T_MODALIDADES = "modalidades";


const get = () => 
    pool
        .query("SELECT p.id_precio, p.id_modalidad, p.frecuencia, p.precio, m.tipo as modalidad FROM ?? AS p JOIN ?? AS m ON p.id_modalidad = m.id_modalidad WHERE p.habilitado = ?", [T_PRECIOS, T_MODALIDADES, 1])
        .then((result) => result)
        .catch((e) => e);

const getSingle = (id) => 
    pool
        .query("SELECT p.id_precio, p.id_modalidad, p.frecuencia, p.precio, m.tipo as modalidad FROM ?? AS p JOIN ?? AS m ON p.id_modalidad = m.id_modalidad WHERE p.id_precio = ? AND p.habilitado = ?", [T_PRECIOS, id, 1])
        .then((result) => result)
        .catch((e) => e);

const getByModalidad = (id) =>
    pool
        .query("SELECT * FROM ?? WHERE id_modalidad = ? AND habilitado = ?", [T_PRECIOS, id, 1])
        .then((result) => result)
        .catch((e) => e);

const create = (obj) =>
    pool
        .query("INSERT INTO ?? SET ?", [T_PRECIOS, obj])
        .then((result) => result)
        .catch((e) => e);

const modify = (obj, id) =>
    pool
        .query("UPDATE ?? SET ? WHERE id_precio = ? AND habilitado = ?", [T_PRECIOS, obj, id, 1])
        .then((result) => result)
        .catch((e) => e);

const enable = (id) =>
    pool
        .query("UPDATE ?? SET habilitado = ? WHERE id_precio = ?", [T_PRECIOS, 1, id])
        .then((result) => result)
        .catch((e) => e);

const del = (id) =>
    pool
        .query("UPDATE ?? SET habilitado = ? WHERE id_precio = ?", [T_PRECIOS, 0, id])
        .then((result) => result)
        .catch((e) => e);
        

module.exports = {get, getSingle, getByModalidad, create, modify, enable, del};
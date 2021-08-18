const pool = require ("../bin/db_connection");
const T_HORARIOS = "horarios";
const T_HORAS = "horas";


const get = () => 
    pool
        .query("SELECT * FROM ?? WHERE habilitado = ?", [T_HORARIOS, 1])
        .then((result) => result)
        .catch((e) => e);

const getHoras = () => 
    pool
        .query("SELECT * FROM ?? WHERE habilitado = ?", [T_HORAS, 1])
        .then((result) => result)
        .catch((e) => e);

const getSingle = (id) => 
    pool
        .query("SELECT * FROM ?? WHERE id_horario = ? AND habilitado = ?", [T_HORARIOS, id, 1])
        .then((result) => result)
        .catch((e) => e);

const create = (obj) =>
    pool
        .query("INSERT INTO ?? SET ?", [T_HORARIOS, obj])
        .then((result) => result)
        .catch((e) => e);

const createHoras = (obj) =>
    pool
        .query("INSERT INTO ?? SET ?", [T_HORAS, obj])
        .then((result) => result)
        .catch((e) => e);

const modify = (obj, id) =>
    pool
        .query("UPDATE ?? SET ? WHERE id_horario = ? AND habilitado = ?", [T_HORARIOS, obj, id, 1])
        .then((result) => result)
        .catch((e) => e);

const enable = (id) =>
    pool
        .query("UPDATE ?? SET habilitado = ? WHERE id_horario = ?", [T_HORARIOS, 1, id])
        .then((result) => result)
        .catch((e) => e);

const del = (id) =>
    pool
        .query("UPDATE ?? SET habilitado = ? WHERE id_horario = ?", [T_HORARIOS, 0, id])
        .then((result) => result)
        .catch((e) => e);
     

module.exports = {get, getHoras, getSingle, create, createHoras, modify, enable, del};
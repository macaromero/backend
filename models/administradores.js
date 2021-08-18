const pool = require ("../bin/db_connection");
const T_ADMINISTRADORES = "administradores";

const get = () => 
    pool
        .query("SELECT * FROM ?? WHERE habilitado = ?", [T_ADMINISTRADORES, 1])
        .then((result) => result)
        .catch((e) => e);

const getSingle = (id) => 
    pool
        .query("SELECT * FROM ?? WHERE id_administrador = ? AND habilitado = ?", [T_ADMINISTRADORES, id, 1])
        .then((result) => result)
        .catch((e) => e);

const create = (obj) =>
    pool
        .query("INSERT INTO ?? SET ?", [T_ADMINISTRADORES, obj])
        .then((result) => result)
        .catch((e) => e);

const confirmStatus = (uid) =>
    pool
        .query("UPDATE ?? SET habilitado = ? WHERE confirmacion_email = ?", [T_ADMINISTRADORES, 1, uid])
        .then ((result) => result)
        .catch ((e) => e);

const auth = ({email, password}) =>
    pool
        .query("SELECT id_administrador, email, password, nombre FROM ?? WHERE email = ? and password = ? AND habilitado = ?", [T_ADMINISTRADORES, email, password, 1])
        .then((result) => result)
        .catch((e) => e);

const modify = (obj, id) =>
    pool
        .query("UPDATE ?? SET ? WHERE id_administrador = ? AND habilitado = ?", [T_ADMINISTRADORES, obj, id, 1])
        .then((result) => result)
        .catch((e) => e);

const modifyPassword = (password, id) =>
    pool
        .query("UPDATE ?? SET password = ? WHERE id_administrador = ? AND habilitado = ?", [T_ADMINISTRADORES, password, id, 1])
        .then((result) => result)
        .catch((e) => e);

const enable = (id) =>
    pool
        .query("UPDATE ?? SET habilitado = ? WHERE id_administrador = ? AND habilitado = ?", [T_ADMINISTRADORES, 1, id, 0])
        .then((result) => result)
        .catch((e) => e);

const del = (id) =>
    pool
        .query("UPDATE ?? SET habilitado = ? WHERE id_administrador = ? AND habilitado = ?", [T_ADMINISTRADORES, 0, id, 1])
        .then((result) => result)
        .catch((e) => e);

module.exports = {get, getSingle, create, confirmStatus, auth, modify, modifyPassword, enable, del};
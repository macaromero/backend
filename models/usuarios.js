const pool = require ("../bin/db_connection");
const T_USUARIOS = "usuarios";

const get = () => 
    pool
        .query("SELECT * FROM ?? WHERE habilitado = ?", [T_USUARIOS, 1])
        .then((result) => result)
        .catch((e) => e);

const getSingle = (id) => 
    pool
        .query("SELECT * FROM ?? WHERE id_usuario = ? AND habilitado = ?", [T_USUARIOS, id, 1])
        .then((result) => result)
        .catch((e) => e);

const getImg = (id) =>
    pool
        .query("SELECT avatar FROM ?? WHERE id_usuario = ? AND habilitado = ?", [T_USUARIOS, id, 1])
        .then((result) => result)
        .catch((e) => e)

const create = (obj) =>
    pool
        .query("INSERT INTO ?? SET ?", [T_USUARIOS, obj])
        .then((result) => result)
        .catch((e) => e);

const confirmStatus = (uid) =>
    pool
        .query("UPDATE ?? SET habilitado = ? WHERE confirmacion_email = ?", [T_USUARIOS, 1, uid])
        .then ((result) => result)
        .catch ((e) => e);

const auth = ({email, password}) =>
    pool
        .query("SELECT id_usuario, email, password, nombre FROM ?? WHERE email = ? AND password = ? AND habilitado = ?", [T_USUARIOS, email, password, 1])
        .then((result) => result)
        .catch((e) => e);

const modify = (obj, id) =>
    pool
        .query("UPDATE ?? SET ? WHERE id_usuario = ? AND habilitado = ?", [T_USUARIOS, obj, id, 1])
        .then((result) => result)
        .catch((e) => e);

const modifyPassword = (password, id) =>
    pool
        .query("UPDATE ?? SET password = ? WHERE id_usuario = ? AND habilitado = ?", [T_USUARIOS, password, id, 1])
        .then((result) => result)
        .catch((e) => e);

const enable = (id) =>
    pool
        .query("UPDATE ?? SET habilitado = ? WHERE id_usuario = ? AND habilitado = ?", [T_USUARIOS, 1, id, 0])
        .then((result) => result)
        .catch((e) => e);

const del = (id) =>
    pool
        .query("UPDATE ?? SET habilitado = ? WHERE id_usuario = ? AND habilitado = ?", [T_USUARIOS, 0, id, 1])
        .then((result) => result)
        .catch((e) => e);

module.exports = {get, getSingle, getImg, create, confirmStatus, auth, modify, modifyPassword, enable, del};
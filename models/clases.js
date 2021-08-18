const pool = require ("../bin/db_connection");
const T_CLASES = "clases";
const T_HORARIOS = "horarios";
const T_MODALIDADES = "modalidades";
const T_HORAS = "horas";

const get = () => 
    pool
        .query("SELECT c.id_clase, c.id_modalidad, c.id_horario, c.link, h.dia, h.id_hora, horas.hora_inicio, horas.hora_fin, m.tipo AS modalidad FROM ?? AS c JOIN ?? AS m ON c.id_modalidad = m.id_modalidad LEFT JOIN ?? AS h ON c.id_horario = h.id_horario LEFT JOIN ?? ON h.id_hora = horas.id_hora WHERE EXISTS (SELECT h.id_horario from ?? AS h where h.habilitado = ?) AND c.habilitado = ? ORDER BY horas.id_hora", [T_CLASES, T_MODALIDADES, T_HORARIOS, T_HORAS, T_HORARIOS, 1, 1])
        .then((result) => result)
        .catch((e) => e);

const getSingle = (id) => 
    pool
        .query("SELECT c.id_clase, c.id_modalidad, c.id_horario, c.link, h.dia, h.hora_inicio, h.hora_fin, m.tipo AS modalidad FROM ?? AS c JOIN ?? AS m ON c.id_modalidad = m.id_modalidad LEFT JOIN ?? AS h ON c.id_horario = h.id_horario WHERE EXISTS (SELECT h.id_horario from ?? AS h where h.habilitado = ?) AND c.habilitado = ? AND c.id_clase = ?", [T_CLASES, T_MODALIDADES, T_HORARIOS, T_HORARIOS, 1, 1, id])
        .then((result) => result)
        .catch((e) => e);

const getByModalidad = (modalidad) =>
    pool
        .query("SELECT c.id_clase, c.id_modalidad, c.id_horario, c.link, h.dia, h.hora_inicio, h.hora_fin, m.tipo AS modalidad FROM ?? AS c JOIN ?? AS m ON c.id_modalidad = m.id_modalidad LEFT JOIN ?? AS h ON c.id_horario = h.id_horario WHERE EXISTS (SELECT h.id_horario from ?? AS h where h.habilitado = ?) AND c.habilitado = ? AND c.id_modalidad = ?", [T_CLASES, T_MODALIDADES, T_HORARIOS, T_HORARIOS, 1, 1, modalidad])
        .then((result) => result)
        .catch((e) => e);

const create = (obj) =>
    pool
        .query("INSERT INTO ?? SET ?", [T_CLASES, obj])
        .then((result) => result)
        .catch((e) => e);

const modify = (obj, id) =>
    pool
        .query("UPDATE ?? SET ? WHERE id_clase = ? AND habilitado = ?", [T_CLASES, obj, id, 1])
        .then((result) => result)
        .catch((e) => e);

const enable = (id) =>
    pool
        .query("UPDATE ?? SET habilitado = ? WHERE id_clase = ?", [T_CLASES, 1, id])
        .then((result) => result)
        .catch((e) => e);

const del = (id) =>
    pool
        .query("UPDATE ?? SET habilitado = ? WHERE id_clase = ?", [T_CLASES, 0, id])
        .then((result) => result)
        .catch((e) => e);
        

module.exports = {get, getSingle, getByModalidad, create, modify, enable, del};
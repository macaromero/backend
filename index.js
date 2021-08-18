/* --- REQUIRIENDO VARIABLES --- */ 
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const Server = require("./class/server");

// Rutas libres
const registroUsuario = require("./routes/registroUsuario");
const registroAdmin = require("./routes/registroAdmin");
const loginUsuario = require("./routes/loginUsuario");
const loginAdmin = require("./routes/loginAdmin");
const clases = require("./routes/clases");
const precios = require("./routes/precios");

// Rutas usuarios
const userClases = require("./routes/user/user-clases");
const userOrdenes = require("./routes/user/user-ordenes");
const userPrecios = require("./routes/user/user-precios");
const userUsuario = require("./routes/user/user-usuario");

// Rutas admin
const adminUsuarios = require("./routes/admin/admin-usuarios");
const adminHorarios = require("./routes/admin/admin-horarios");
const adminClases = require("./routes/admin/admin-clases");
const adminOrdenes = require("./routes/admin/admin-ordenes");
const adminPrecios = require("./routes/admin/admin-precios");
const adminAdministrador = require("./routes/admin/admin-administrador");

//Middlewares
const {secured, securedAdmin} = require("./middlewares/login");


/* --- INSTANCIANDO CLASE DEL SERVIDOR --- */ 
const server = new Server();

/* --- INICIALIZANDO SERVIDOR --- */ 
server.start(()=>{
    console.log(`Servidor corriendo en puerto: ${server.port} y en host: ${server.host}`)
});

/* --- BODY-PARSER --- */ 
server.app.use(express.urlencoded({extended:false}));
server.app.use(express.json());

/* --- CORS --- */ 
server.app.use(cors());

/* --- DEFINIENDO LAS RUTAS --- */ 
// Rutas libres
server.app.use("/registro", registroUsuario);
server.app.use("/registroAdmin", registroAdmin);
server.app.use("/login", loginUsuario);
server.app.use("/loginAdmin", loginAdmin);
server.app.use("/clases", clases);
server.app.use("/precios", precios);

// Rutas usuarios
server.app.use("/user-clases", secured, userClases);
server.app.use("/user-ordenes", secured, userOrdenes);
server.app.use("/user-precios", secured, userPrecios);
server.app.use("/user", secured, userUsuario);

// Rutas admin
server.app.use("/admin-usuarios", securedAdmin, adminUsuarios);
server.app.use("/admin-clases", securedAdmin, adminClases);
server.app.use("/admin-horarios", securedAdmin, adminHorarios);
server.app.use("/admin-ordenes", securedAdmin, adminOrdenes);
server.app.use("/admin-precios", securedAdmin, adminPrecios);
server.app.use("/admin", securedAdmin, adminAdministrador);



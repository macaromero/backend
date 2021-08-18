const fs = require ("fs");
const jwt = require ("jsonwebtoken");
const key = fs.readFileSync("./keys/public.pem");

const secured = (req, res, next) => {
    try {
        const {auth} = req.headers;  
        const verify = jwt.verify(auth, key);
        
        if (verify.id_usuario) {
            req.id = verify.id_usuario;
            next();
        } else {
            res.json({
                estado: "Success",
                mensaje: "No estás autorizado para acceder"
            });
        };
        
    } catch (error) {
        console.error(error);
        res.json({
            estado: "Error",
            mensaje: error});
    };
};

const securedAdmin = (req, res, next) => {
    try {
        const {auth} = req.headers;  
        const verify = jwt.verify(auth, key);

        if (verify.id_administrador) {
            req.id = verify.id_administrador;
            next();
        } else {
            res.json({
                estado: "Success",
                mensaje: "No estás autorizado para acceder"
            });
        };
        
    } catch (error) {
        console.error(error);
        res.json({
            estado: "Error",
            mensaje: error});
    };
};

module.exports = {secured, securedAdmin};
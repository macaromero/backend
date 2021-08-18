const fs = require("fs");
const jwt = require("jsonwebtoken");
const sha1 = require("sha1");
const model = require("../models/administradores");
const expiration = {expiresIn: "7h", algorithm: "RS256"};
const key = fs.readFileSync("./keys/private.pem");
const createToken = payload => jwt.sign(payload, key, expiration);


const login = async(req, res) => {
  const {email} = req.body;
  const password = sha1(req.body.password);

  try {
    const result = await model.auth({email, password});

    if (result.length == 0) {
      res.json({
        estado: "Success",
        mensaje: "Algún dato es incorrecto, o te olvidaste de confirmar tu registro."})
    }
    else {
        const id_administrador = result[0].id_administrador;
        const nombre = result[0].nombre;

        const token = createToken({id_administrador, email});
        res.json({
          estado: "Success",
          JWT: token,
          nombre: nombre, 
          id_administrador: id_administrador, 
        });        
    }
  } catch (error) {
    res.json({
      estado: "Error",
      mensaje: error
  });
  };
};

module.exports = {login};

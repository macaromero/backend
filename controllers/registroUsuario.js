const model = require("../models/usuarios");
const sha1 = require("sha1");
const {v4:uid} = require("uuid");
const Email = require("../class/emailRegistro");
const serviceCorreo = require("../services/emailRegistro");
const serviceImg = require("../services/uploadImg");

/**
 * Esta función es asincrónica y se encarga de crear al usuario registrado en la base de datos y enviar el correo electrónico de confirmación.
 */
const create = async (req, res) => {
    /**
     * Se instancia la clase Email
     */
    const emailClass = new Email();

    const body = req.body;
    
    /**
     * Se crea el objeto con todos los datos que la base de datos requiere para dar de alta un usuario. Todos se obtienen del req.body, a excepción del avatar, que se obtiene del req.file (creado por la librería multer), y la confirmación_correo que se obtiene a través de la librería uuid.
     */
    const obj = {
        nombre: body.nombre,
        apellido: body.apellido,
        tipo_documento: body.tipo_documento,
        num_documento: body.num_documento,
        email: body.email,
        password: sha1(body.password),
        avatar: req.file.filename,
        fecha_nacimiento: body.fecha_nacimiento,
        celular: body.celular,
        confirmacion_email: uid()
    };
    try {
        /**
         * La constante registro llama al model de usuarios, y a la función create. A esta se le pasa como parámetro el objeto creado anteriormente. Se encarga de crear al usuario nuevo en la base de datos.
         */
        const registro = await model.create(obj);

        /**
         * La constante enviarCorreo llama al método enviarEmail que se encuentra dentro de la clase Email, y recibe los dos parámetros que necesita, el correo del usuario registrado, y la información que va dentro del correo electrónico a enviar, obtenida a través de la función confirmacionCorreo del serviceCorreo. Esta constante envia efectivamente el correo electrónico al usuario registrado.
         */
        const enviarCorreo = await emailClass.enviarEmail(obj.email, serviceCorreo.confirmacionCorreo(obj.nombre, obj.apellido, "registro", obj.confirmacion_email));

        /**
         * La constante crearAvatar es la encargada de llamar al servicio de uploadImg y crear la imagen en la carpeta public/images.
         */
        const crearAvatar = serviceImg.createImg(req.file.path, obj.avatar);

        /**
         * Si todos los pasos ocurrieron correctamente, se le responde al servidor enviándole como json el resultado de la constante registro y de la constante enviarCorreo.
         */
        res.json({
            estado: "Success",
            mensaje: registro,
            correo: enviarCorreo
        });

    } catch (error) {
        /**
         * Si en cambio hubo algún error, se crea otra constante enviarCorreo, esta va a realizar la misma función que la anterior que lleva su mismo nombre, pero en este caso el contenido del correo electrónico será el que corresponde a la falla en el registro.
         */
        const enviarCorreo = await emailClass.enviarEmail(obj.email, serviceCorreo.registroFallido);

        /**
         * Acá se elimina la imagen temporal en caso de que se haya creado al momento de registrarse el usuario.
         */
        serviceImg.deleteTemp(req.file.path);

        /**
         * Finalmente se le responde al servidor, enviando un json con el error y el resultado del envío de correo correspondiente a un registro fallido.
         */
        res.json({
            estado: "Error",
            mensaje: error,
            correo: enviarCorreo
        })
    };  
};

const verify = async (req, res) => {
    try {
        const {uid} = req.params;
        const verifyUser = await model.confirmStatus(uid);
        res.json({
            estado: "Success",
            mensaje: "Registro completado con éxito",
            verifyUser
        })
    } catch (error) {
        res.json({
            estado: "Error",
            mensaje: error
        })
    }
};

module.exports = {create, verify};
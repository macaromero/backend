/**
 * @param {string} nombre corresponde al nombre del usuario
 * @param {string} apellido corresponde al apellido del usuario
 * @param {string} url corresponde a la ruta creada para que el usuario se registre.
 * @param {string} confirmacion_email corresponde al string que vamos a obtener de la librería uuid, que servirá de url dinámica para realizar la confirmación del usuario registrado.
 * @returns {object} retorna el objeto creado en su interior.
 * Esta función está encargada de enviar los datos que corresponden al cuerpo del correo electrónico a enviar.
 */
const confirmacionCorreo = (nombre, apellido, url, confirmacion_email) => {
    const datos = {
    asunto: "Verificación de correo",
    html: `<h2>Gracias por registrarte ${nombre} ${apellido}</h2>
    <h3>Creaste tu cuenta correctamente, clickeá el link para terminar el proceso de verificación:</h3>
    <br>
    <a href="http://localhost:3000/${url}/verify/${confirmacion_email}">Hacé click acá</a>`
    }

    return datos
};

/**
 * Esta constante crea un asunto y un cuerpo para el correo electrónico a enviar en el caso de que haya un error.
 */
const registroFallido = {
    asunto: "Error creación cuenta",
    html: `<h3>Ocurrió un error mientras intentabas crear tu cuenta, intentalo nuevamente más tarde.</h3>`
};


module.exports = {confirmacionCorreo, registroFallido};
const nodemailer = require("nodemailer");

/**
 * Esta es la creación de la clase Email, que contiene los parámetros necesarios para crear el correo electrónico y enviarlo.
 */
class Email {

    /**
     * 
     */
    constructor(){}

    /**
     * @param {string} correo_usuario corresponde a la dirección de correo electrónico del usuario registrado.
     * @param {object} obj corresponde a los datos del subject y el cuerpo del mail a enviar.
     * @returns {Promise} si el correo fue enviado, la promesa se resuelve correctamente, sino devuelve un error.
     * Este es el método enviarEmail que se encarga efectivamente de la creación y el envío del correo electrónico
     */
    enviarEmail(correo_usuario, obj){

        return new Promise((resolve, reject)=>{
            /**
             * La constante transport se encarga de llamar al método createTransport de la librería nodemailer, como parámetro del mismo, se envía un objeto en el que se establecen los datos de la casilla de correo de la cual sale el correo electrónico que se le envía al usuario al momento de registrarse, recibe los datos del archivo .env. Ahí se encuentran el MAIL_HOST, el MAIL_PORT, MAIL_USER y MAIL_PASS.
             */
            const transport = nodemailer.createTransport({
                host: process.env.MAIL_HOST,
                port: process.env.MAIL_PORT,
                secure: false,
                auth:{
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS
                }, 
                tls:{
                    rejectUnauthorized: false
                }
            });

            /**
             * La constante mailOptions se encarga de crear el objeto que brinda los datos del correo a enviar. A excepción del MAIL_USER, los otros tres ingresarán al método por parámetro.
             */
            const mailOptions = {
                from: process.env.MAIL_USER,
                to: correo_usuario,
                subject: obj.asunto,
                html: obj.html,
            };
            
            /**
             * Finalmente se llama al método createTestAccount de la librería nodemailer, este tiene un callback. Dentro del mismo, se llama a la constante transport y al método sendMail, que también posee un callback. Este método es el encargado de enviar el correo electrónico. Recibe como parámetro la constante mailOptions y devuelve la información de respuesta (en el caso de que el correo se haya enviado), o el error (en el caso de que se rechace el envío por algún motivo).
             */
            nodemailer.createTestAccount((error)=>{
                transport.sendMail(mailOptions, (error, info)=>{
                    if(error){
                        return reject(error)
                    }
                    else{
                        return resolve(info)
                    }
                })
            })
        })

    }
};

module.exports = Email;

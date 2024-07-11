const nodemailer = require("nodemailer");

class EmailManager {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            port: 587,
            auth: {
                user: "coderhouse50015@gmail.com",
                pass: "norp renb afxw uxyq"
            }
        })
    }

    async enviarCorreoCompra(email, first_name, ticket) {
        try {
            const mailOptions = {
                from: "Coder Test <coderhouse50015@gmail.com>",
                to: email,
                subject: "Confirmacion de compra",
                html: `
                        <h1> Confirmación de compra </h1>
                        <p>Gracias por tu compra, ${first_name} </p>
                        <p>El número de tu orden es: ${ticket} </p>
                `
            }
            await this.transporter.sendMail(mailOptions);
        } catch (error) {
            console.log("Error al enviar el mail");
        }
    }

    async enviarCorreoRestablecimiento(email, first_name, token) {
        try {
            const mailOptions = {
                from: "Coder Test <coderhouse50015@gmail.com>",
                to: email,
                subject: "Restablecimiento de contraseña",
                html: `
                        <h1> Restablecimiento de contraseña </h1>
                        <p>Hola ${first_name} ! ke ase? </p>
                        <p>Pediste restablecer la contraseña porque siempre te olvidas de todo. Te enviamos el codigo de confirmacion: </p>
                        <strong> ${token} </strong>
                        <p> Este codigo expira en una  hora </p>
                        <a href="http://localhost:8080/password"> Restablecer contraseña </a>

                `
            }
            await this.transporter.sendMail(mailOptions);


        } catch (error) {
            console.log("Error al enviar el correo de restablecimiento");
        }
    }

}


module.exports = EmailManager; 
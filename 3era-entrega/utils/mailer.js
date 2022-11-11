const nodemailer = require('nodemailer');
const { errorMonitor } = require('nodemailer/lib/xoauth2');

const TEST_MAIL = 'jaledbreyaui41@gmail.com'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: TEST_MAIL,
        pass: 'xoogcrpulqmsrbcw'
    }
});

const sendMail = (user) => {

    const mailOptions = {
        from: 'Servidor de Jaled!',
        to: user.email,
        subject: "Bienvenido!",
        html: `<div> <h1>Bienvenido a tienda Jaled! verfique que sus datos sean correctos</h1>
        <h3>${user.nombre} ${user.apellido}</h3>
        <h3>${user.telefono}</h3>
        <h3>${user.direccion}</h3>
    </div>`,
        attachments: [
            {
                path: 'https://admin2.cahuracan.com/new/wp-content/uploads/2021/01/el_palacio_1-2.jpg'
                // // notar que es el image adress//
            }
        ]
    }


        ; (async () => {
            try {
                const info = await transporter.sendMail(mailOptions)
            } catch (error) {
                console.log(error);
            }
        })()
}

module.exports = sendMail 

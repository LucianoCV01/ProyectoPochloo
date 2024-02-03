function enviarMail() {

Email.send({
    Host:"smtp.elasticemail.com",
    Username: "inessitatoledo@gmail.com",
    Password: "4FD8EFB684B3E78B46DAC7C6EFA4117D4603",
    To: 'silc8718@gmail.com',
    from: "inessitatoledo@gmail.com",
    Subject: "Gracias Por Tu Mensaje",
    Body: "Pronto estaremos contactando contigo"
}).then (mensaje => alerta(mensaje));
}
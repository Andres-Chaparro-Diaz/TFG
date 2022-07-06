const User = require('../models/user');
const Survey = require('../models/survey');
const PostGameSurvey = require('../models/postGameSurvey');
const CryptoJS = require('crypto-js');
const nodemailer = require('nodemailer');
const thisclass = this;

function register(req, res) {
    User.find({})
        .then(users => {
            let username = req.body.username;

            let pwd = CryptoJS.AES.decrypt(req.body.password, 'public_key').toString(CryptoJS.enc.Utf8)
            var exist = false;
            for (var i = 0; i < users.length; i++) {
                if (users[i].username.toLowerCase() == username.toLowerCase()) {
                    exist = true;
                    break;
                }
            }
            if (!exist) {

                let user = new User(req.body);
                user.password = CryptoJS.AES.encrypt(pwd, 'AIzaSyDz24fY9Z6F291PGKkPo2m8G_r8TtYayV0').toString();
                user.save()
                    .then(userUpdated =>
                        res.status(201).send({ username: userUpdated.username, msg: "Usuario registrado correctamente", type: "register" })
                    ).catch(err => res.status(500).send({ err }))

            } else {
                res.status(201).send({ error: "El usuario ya existe", type: "register" });
            }
        });
}

function changePassword(req, res) {
    User.findOne({ username: { $regex: new RegExp(req.body.username, "i") } })
        .then(user => {
            let pwd = CryptoJS.AES.decrypt(req.body.password, 'public_key').toString(CryptoJS.enc.Utf8)
            var exist = true;
            let codigo = req.body.codigo;
            if (exist) {
                if (user.codigo == codigo) {
                    user.password = CryptoJS.AES.encrypt(pwd, 'AIzaSyDz24fY9Z6F291PGKkPo2m8G_r8TtYayV0').toString();
                    user.codigo = "";
                    user.save()
                        .then(userUpdated =>
                            res.status(201).send({ username: userUpdated.username, msg: "Contraseña cambiada correctamente", type: "changePassword" })
                        ).catch(err => res.status(500).send({ err }))

                } else {
                    res.status(201).send({ error: "El codigo no es correcto", type: "changePassword" });
                }
            } else {
                res.status(201).send({ error: "El usuario no ha sido encontrado", type: "changePassword" });
            }
        });
}

function login(req, res) {
    User.findOne({ username: { $regex: new RegExp(req.body.username, "i") } })
        .then(user => {
            let password = CryptoJS.AES.decrypt(req.body.password, 'public_key').toString(CryptoJS.enc.Utf8)
            let passwordDB = CryptoJS.AES.decrypt(user.password, 'AIzaSyDz24fY9Z6F291PGKkPo2m8G_r8TtYayV0').toString(CryptoJS.enc.Utf8)
            if (passwordDB == password) {
                res.status(201).send({ username: user.username, msg: "Credenciales válidas", type: "login" })
            } else {
                res.status(201).send({ error: "Contraseña incorrecta", type: "login" })
            }
        }).catch(function(err) {
            res.status(201).send({ error: "Usuario no encontrado", type: "login" });
        });
}

function getAllRecords(req, res) {
    User.find({})
        .then(users => {
            let globalRecords = {};
            for (var i = 0; i < users.length; i++) {
                let username = users[i].username;
                globalRecords[username] = users[i].records;
            }
            res.status(201).send({ globalRank: globalRecords, msg: "Ranking global", type: "getGlobalRecords" });
        });
}

function getRecords(req, res) {
    User.findOne({ username: { $regex: new RegExp(req.body.username, "i") } })
        .then(user => {
            let username = req.body.username;
            if (username != undefined) {
                res.status(201).send({ personalRank: user.records, msg: "records obtenidos", type: "getRecords" })
            }

        }).catch(function(err) {
            res.status(201).send({ error: "Usuario no encontrado", type: "getRecords" })
        });
}

function addRecord(req, res) {
    User.findOne({ username: { $regex: new RegExp(req.body.username, "i") } })
        .then(user => {
            let points = req.body.points;
            let recordList = user.records;
            let result;
            for (var j = 0; j <= 4; j++) {
                if (recordList[j] == null || recordList[j] == undefined) {
                    recordList[j] = 0;
                }
            }

            recordList.sort(function(a, b) { return b - a });

            if (recordList[4] == undefined || points > recordList[4]) {
                recordList[4] = points;
                result = "Nuevo record guardado";
            } else {
                result = "No has ningun record anterior";
            }
            recordList.sort(function(a, b) { return b - a });
            user.records = recordList;
            if (user.gamesPlayed != null && user.gamesPlayed != undefined) {
                user.gamesPlayed++;
            } else {
                user.gamesPlayed = 1;
            }
            user.save()
                .then(userUpdated => {
                    PostGameSurvey.find({}).then(surveys => {
                        let done = false;
                        let todo = false;
                        for (var k = 0; k < surveys.length; k++) {
                            if (surveys[k].username.toLowerCase() == userUpdated.username.toLowerCase()) {
                                done = true;
                            }
                        }

                        if (userUpdated.gamesPlayed >= 5) {
                            todo = true;
                        }
                        if (userUpdated.participa) {
                            res.status(201).send({ username: userUpdated.username, msg: result, todo: todo, done: done, type: "newRecord", participa: userUpdated.participa })
                        } else {
                            res.status(201).send({ username: userUpdated.username, msg: result, todo: todo, done: true, type: "newRecord", participa: false })
                        }
                    });

                }).catch(err => res.status(500).send({ err }))
        }).catch(function(err) {
            res.status(201).send({ error: "Gracias por jugar, te animamos a que te registres y participes en el estudio. Tu puntuacion fue: " + points, type: "newRecord" })
        });
}

function checkUser(req, res) {
    User.findOne({ username: { $regex: new RegExp(req.body.username, "i") } })
        .then(user => {
            let username = req.body.username;
            var found = true;
            if (!found) {
                res.status(201).send({ error: "Usuario no encontrado", type: "checkUser" })
            } else {
                res.status(201).send({ username: user.username, msg: "  ", type: "checkUser" })
            }
        }).catch(function(err) {
            res.status(201).send({ error: "Usuario no encontrado", type: "checkUser" })
        });
}


function sendEmail(req, res) {
    var random = function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }


    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'tfgjuegomultitask@gmail.com',
            pass: 'xxrycjdmxewoccyi'
        }
    });

    let codigo = random(10000, 99999);
    var mensaje = "Se ha enviado una solicitud para recuperar su contraseña. Por favor, copie este código: " + codigo + '';


    User.findOne({ username: { $regex: new RegExp(req.body.username, "i") } })
        .then(user => {
            var mailOptions = {
                from: 'tfgjuegomultitask@gmail.com',
                to: user.email,
                subject: 'Recuperar Contraseña',
                text: mensaje,
                html: "Se ha enviado una solicitud para recuperar su contraseña. Por favor, copie este código: " + codigo + '<br></br> A continuación, visite la siguiente página y rellene los datos: <a href= "https://gameandreschaparro.vercel.app/#changePassword">Recuperar contraseña</a>'
            };
            user.codigo = codigo;
            user.save()
                .then(userUpdated =>
                    transporter.sendMail(mailOptions, function(error, info) {
                        if (error) {
                            console.log('Email error:' + error);
                            res.status(201).send({ error: "Ha habido un error enviando el correo", type: "sendEmail" })
                        } else {
                            console.log('Email enviado');
                            res.status(201).send({ msg: "Email enviado al correo: " + userUpdated.email + ". Muchas veces el email llega como spam.", type: "sendEmail" })
                        }
                    })
                ).catch(err => res.status(500).send({ err }))
        }).catch(function(err) {
            res.status(201).send({ error: "Usuario no encontrado", type: "sendEmail" })
        });
}

module.exports = {
    login,
    addRecord,
    getRecords,
    getAllRecords,
    register,
    sendEmail,
    checkUser,
    changePassword,
}
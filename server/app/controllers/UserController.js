const User = require('../models/User');
const CryptoJS = require('crypto-js');

function register(req, res) {
    User.find({})
        .then(users => {
            let username = req.body.username;
            let pwd = req.body.password;
            //CryptoJS.AES.encrypt(req.body.pwd, 'secret key 123').toString();
            pwd = CryptoJS.AES.decrypt(req.body.password, 'public_key').toString(CryptoJS.enc.Utf8)
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
                    .then(user =>
                        res.status(201).send({ username: user.username, msg: "Usuario registrado correctamente", type: "register" })
                    ).catch(err => res.status(500).send({ err }))

            } else {
                res.status(201).send({ error: "El usuario ya existe", type: "register" });
            }
        });
}

function login(req, res) {
    User.find({})
        .then(users => {
            let username = req.body.username;
            let password = req.body.password;
            var found = false;
            password = CryptoJS.AES.decrypt(req.body.password, 'public_key').toString(CryptoJS.enc.Utf8)

            for (var i = 0; i < users.length; i++) {
                if (users[i].username.toLowerCase() == username.toLowerCase()) {
                    found = true;
                    let user = users[i]
                    let passwordDB = CryptoJS.AES.decrypt(user.password, 'AIzaSyDz24fY9Z6F291PGKkPo2m8G_r8TtYayV0').toString(CryptoJS.enc.Utf8)
                    if (passwordDB == password) {
                        res.status(201).send({ username: user.username, msg: "Credenciales válidas", type: "login" })
                    } else {
                        res.status(201).send({ error: "Contraseña incorrecta", type: "login" })
                    }
                }
            }
            if (!found) {
                res.status(201).send({ error: "Usuario no encontrado", type: "login" })
            }
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
            res.status(201).send({ globalRank: globalRecords, msg: "Credenciales válidas", type: "getGlobalRecords" })


        });
}

function getRecords(req, res) {
    User.find({})
        .then(users => {
            let username = req.body.username;
            var found = false;
            if (username != undefined) {
                for (var i = 0; i < users.length; i++) {
                    if (users[i].username.toLowerCase() == username.toLowerCase()) {
                        found = true;
                        let user = users[i]
                        res.status(201).send({ personalRank: user.records, msg: "Credenciales válidas", type: "getRecords" })

                    }
                }
                if (!found) {
                    res.status(201).send({ error: "Usuario no encontrado", type: "getRecords" })
                }
            }

        });
}

function addRecord(req, res) {
    User.find({})
        .then(users => {
            let points = req.body.points;
            let username = req.body.username;
            var found = false;
            let user;

            for (var i = 0; i < users.length; i++) {
                if (users[i].username.toLowerCase() == username.toLowerCase()) {
                    found = true;
                    user = users[i]
                }
            }
            console.log(user);
            let recordList = user.records;
            let result;
            for (var i = 0; i <= 4; i++) {
                if (recordList[i] == null || recordList[i] == undefined) {
                    recordList[i] = 0;
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
            user.save()
                .then(userUpdated =>
                    res.status(201).send({ username: userUpdated.username, msg: result, type: "newRecord" })
                ).catch(err => res.status(500).send({ err }))

            if (!found) {
                res.status(201).send({ error: "Usuario no encontrado", type: "newRecord" })
            }
        });
}

module.exports = {
    login,
    addRecord,
    getRecords,
    getAllRecords,
    register,
}
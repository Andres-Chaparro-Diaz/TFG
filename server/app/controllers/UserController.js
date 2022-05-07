const User = require('../models/User');

function listall(req, res) {
    User.find({})
        .exec(users => {
            if (users.length) return res.status(200).send({ users })
            return res.status(204).send({ message: 'NO CONTENT' });
        }).catch(err => res.status(500).send({ err }))
}

function create(req, res) {
    let user = new User(req.body);
    user.save()
        .then(user =>
            res.status(201).send({ user })
        ).catch(err => res.status(500).send({ err }))
}

function register(req, res) {
    User.find({})
        .then(users => {
            let username = req.body.username;
            let pwd = req.body.pwd;
            let pwd2 = req.body.pwd2;

            var exist = false;

            for (var i = 0; i < users.length; i++) {
                if (users[i].username.toLowerCase() == username.toLowerCase()) {
                    exist = true;
                    break;
                }
            }
            if (!exist) {
                if (pwd == pwd2) {
                    let user = new User(req.body);
                    user.save()
                        .then(user =>
                            res.status(201).send({ user, msg: "Usuario registrado correctamente", type: "register" })
                        ).catch(err => res.status(500).send({ err }))
                } else {
                    res.status(201).send({ error: "Las contraseñas no coinciden", type: "register" });
                }

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

            for (var i = 0; i < users.length; i++) {
                if (users[i].username.toLowerCase() == username.toLowerCase()) {
                    found = true;
                    let user = users[i]
                    if (users[i].password == password) {
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
            let password = req.body.password;
            var found = false;

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
            console.log(user);
            user.save()
                .then(newUser =>
                    res.status(201).send({ newUser, msg: result, type: "newRecord" })
                ).catch(err => res.status(500).send({ err }))

            if (!found) {
                res.status(201).send({ error: "Usuario no encontrado", type: "newRecord" })
            }
        });
}

function show(req, res) {
    if (req.body.error) return res.status(500).send({ error });
    if (!req.body.users) return res.status(404).send({ message: 'Not Found' });
    let users = req.body.users;
    return res.status(200).send({ users });
}

function update(req, res) {
    if (req.body.error) return res.status(500).send({ error });
    if (!req.body.users) return res.status(404).send({ message: 'Not Found' });
    let user = req.body.users[0];
    user = Object.assign(user, req.body);
    user.save()
        .then(newUser => res.status(200).send({ message: 'User Updated', newUser })).catch(err => res.status(500).send({ err }))
}

function deleted(req, res) {
    if (req.body.error) return res.status(500).send({ error });
    if (!req.body.users) return res.status(404).send({ message: 'Not Found' });
    req.body.users[0].remove()
        .then(user => {
            res.status(200).send({ message: 'User removed', user })
        }).catch(err => res.status(500).send({ err }));
}

function find(req, res, next) {
    let query = {};
    query[req.params.key] = req.params.value
    User.find(query).then(users => {
        if (!users.length) return next();
        req.body.users = users;
        return next();
    }).catch(err => {
        req.body.error = err;
        next();
    })
}

module.exports = {
    listall,
    login,
    addRecord,
    getRecords,
    getAllRecords,
    register,
    show,
    create,
    update,
    deleted,
    find,
}
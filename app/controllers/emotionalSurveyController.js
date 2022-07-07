const EmotionalSurvey = require('../models/emotionalSurvey');
const User = require('../models/user');

function listall(req, res) {
    EmotionalSurvey.find({})
        .exec(emotionalSurveys => {
            if (emotionalSurveys.length) return res.status(200).send({ emotionalSurveys })
            return res.status(204).send({ message: 'NO CONTENT' });
        }).catch(err => res.status(500).send({ err }))
}


function create(req, res) {
    User.findOne({ username: { $regex: new RegExp(req.body.username, "i") } }).then(user => {
        EmotionalSurvey.find({ username: { $regex: new RegExp(req.body.username, "i") } }).then(surveys => {
            let lastSurvey = undefined;
            for (var i = 0; i < surveys.length; i++) {
                let survey = surveys[i];
                if (lastSurvey == undefined) {
                    lastSurvey = survey;
                } else {
                    let dateLast = lastSurvey.createdAt instanceof Date;
                    let date = survey.createdAt instanceof Date;
                    if (date > dateLast) {
                        lastSurvey = survey;
                    }
                }
            }
            let now = new Date.now();
            let lastDate = lastSurvey.createdAt instanceof Date;
            var hours = Math.abs(now - lastDate) / 36e5;
            console.log(hours);
            if (hours >= 3) {
                console.log(hours);
                let emotionalSurvey = new EmotionalSurvey(req.body);
                emotionalSurvey.save()
                    .then(newSurvey => {
                        user.gamesToEmotional = 3;
                        user.save().then(
                            res.status(201).send({ msg: "Formulario enviado correctamente", type: "create" })
                        ).catch(err => res.status(500).send({ error: "No se ha podido enviar el formulario", err, type: "create" }));
                    }).catch(err => res.status(500).send({ error: "No se ha podido enviar el formulario", err, type: "create" }));
            } else {
                res.status(201).send({ msg: "Formulario enviado correctamente", type: "create" })
            }
        })

    }).catch(function(err) {
        res.status(201).send({ error: "Usuario no encontrado", type: "create" });
    });
}

function show(req, res) {
    if (req.body.error) return res.status(500).send({ error });
    if (!req.body.users) return res.status(404).send({ message: 'Not Found' });
    let emotionalSurveys = req.body.emotionalSurveys;
    return res.status(200).send({ emotionalSurveys });
}

function update(req, res) {
    if (req.body.error) return res.status(500).send({ error });
    if (!req.body.users) return res.status(404).send({ message: 'Not Found' });
    let emotionalSurvey = req.body.emotionalSurveys[0];
    emotionalSurvey = Object.assign(emotionalSurvey, req.body);
    emotionalSurvey.save()
        .then(emotionalSurvey => res.status(200).send({ message: 'PostGameSurvey Updated', emotionalSurvey })).catch(err => res.status(500).send({ err }))
}

function deleted(req, res) {
    if (req.body.error) return res.status(500).send({ error });
    if (!req.body.users) return res.status(404).send({ message: 'Not Found' });
    req.body.users[0].remove()
        .then(emotionalSurvey => {
            res.status(200).send({ message: 'PostGameSurvey removed', emotionalSurvey })
        }).catch(err => res.status(500).send({ err }));
}

function find(req, res, next) {
    let query = {};
    query[req.params.key] = req.params.value
    EmotionalSurvey.find(query).then(emotionalSurveys => {
        if (!emotionalSurveys.length) return next();
        req.body.emotionalSurveys = emotionalSurveys;
        return next();
    }).catch(err => {
        req.body.error = err;
        next();
    })
}

module.exports = {
    show,
    listall,
    create,
    update,
    deleted,
    find,
}
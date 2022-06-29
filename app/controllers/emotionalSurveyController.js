const EmotionalSurvey = require('../models/emotionalSurvey');

function listall(req, res) {
    EmotionalSurvey.find({})
        .exec(emotionalSurveys => {
            if (emotionalSurveys.length) return res.status(200).send({ emotionalSurveys })
            return res.status(204).send({ message: 'NO CONTENT' });
        }).catch(err => res.status(500).send({ err }))
}


function create(req, res) {
    let emotionalSurvey = new EmotionalSurvey(req.body);

    emotionalSurvey.save()
        .then(
            res.status(201).send({ msg: "Formulario enviado correctamente", type: "create" })
        ).catch(err => res.status(500).send({ error: "No se ha podido enviar el formulario", err, type: "create" }));
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
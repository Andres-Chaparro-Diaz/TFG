const PostGameSurvey = require('../models/postGameSurvey');

function listall(req, res) {
    PostGameSurvey.find({})
        .exec(postGameSurveys => {
            if (postGameSurveys.length) return res.status(200).send({ postGameSurveys })
            return res.status(204).send({ message: 'NO CONTENT' });
        }).catch(err => res.status(500).send({ err }))
}


function create(req, res) {
    let postGameSurvey = new PostGameSurvey(req.body);
    PostGameSurvey.find({})
        .then(surveys => {
            let username = req.body.username;
            var found = false;
            for (var i = 0; i < surveys.length; i++) {
                if (surveys[i].username.toLowerCase() == username.toLowerCase()) {
                    found = true;
                    res.status(201).send({ error: "Cuestionario ya hecho.", type: "create" })
                }
            }
            if (!found) {
                postGameSurvey.save()
                    .then(
                        res.status(201).send({ msg: "Formulario enviado correctamente", type: "create" })
                    ).catch(err => res.status(500).send({ error: "No se ha podido enviar el formulario", err, type: "create" }))
            }
        });
}

function show(req, res) {
    if (req.body.error) return res.status(500).send({ error });
    if (!req.body.users) return res.status(404).send({ message: 'Not Found' });
    let postGameSurveys = req.body.postGameSurveys;
    return res.status(200).send({ postGameSurveys });
}

function update(req, res) {
    if (req.body.error) return res.status(500).send({ error });
    if (!req.body.users) return res.status(404).send({ message: 'Not Found' });
    let postGameSurvey = req.body.postGameSurveys[0];
    postGameSurvey = Object.assign(postGameSurvey, req.body);
    postGameSurvey.save()
        .then(newPostGameSurvey => res.status(200).send({ message: 'PostGameSurvey Updated', newPostGameSurvey })).catch(err => res.status(500).send({ err }))
}

function deleted(req, res) {
    if (req.body.error) return res.status(500).send({ error });
    if (!req.body.users) return res.status(404).send({ message: 'Not Found' });
    req.body.users[0].remove()
        .then(postGameSurvey => {
            res.status(200).send({ message: 'PostGameSurvey removed', postGameSurvey })
        }).catch(err => res.status(500).send({ err }));
}

function find(req, res, next) {
    let query = {};
    query[req.params.key] = req.params.value
    PostGameSurvey.find(query).then(postGameSurveys => {
        if (!postGameSurveys.length) return next();
        req.body.postGameSurveys = postGameSurveys;
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
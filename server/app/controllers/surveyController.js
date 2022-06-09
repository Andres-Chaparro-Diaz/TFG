const Survey = require('../models/Survey');

function listall(req, res) {
    Survey.find({})
        .exec(surveys => {
            if (surveys.length) return res.status(200).send({ surveys })
            return res.status(204).send({ message: 'NO CONTENT' });
        }).catch(err => res.status(500).send({ err }))
}

function create(req, res) {
    let survey = new Survey(req.body);
    survey.save()
        .then(survey =>
            res.status(201).send({ msg: "Formulario enviado correctamente", type: "create" })
        ).catch(err => res.status(500).send({ error: "No se ha podido enviar el formulario", err, type: "create" }))

}

function show(req, res) {
    if (req.body.error) return res.status(500).send({ error });
    if (!req.body.users) return res.status(404).send({ message: 'Not Found' });
    let surveys = req.body.surveys;
    return res.status(200).send({ surveys });
}

function update(req, res) {
    if (req.body.error) return res.status(500).send({ error });
    if (!req.body.surveys) return res.status(404).send({ message: 'Not Found' });
    let survey = req.body.surveys[0];
    survey = Object.assign(survey, req.body);
    survey.save()
        .then(newSurvey => res.status(200).send({ message: 'Survey Updated', newSurvey })).catch(err => res.status(500).send({ err }))
}

function deleted(req, res) {
    if (req.body.error) return res.status(500).send({ error });
    if (!req.body.surveys) return res.status(404).send({ message: 'Not Found' });
    req.body.surveys[0].remove()
        .then(survey => {
            res.status(200).send({ message: 'Survey removed', survey })
        }).catch(err => res.status(500).send({ err }));
}

function find(req, res, next) {
    let query = {};
    query[req.params.key] = req.params.value
    Survey.find(query).then(surveys => {
        if (!surveys.length) return next();
        req.body.surveys = surveys;
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
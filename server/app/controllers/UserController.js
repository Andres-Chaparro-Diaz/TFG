const User = require('../models/User');

function listall(req, res) {
    User.find({})
        .then(users => {
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
        .then(user => res.status(200).send({ message: 'User Updated', user })).catch(err => res.status(500).send({ err }))
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
    show,
    create,
    update,
    deleted,
    find,
}
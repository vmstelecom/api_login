const { Router } = require('express');
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'GET produtos'
    });
});

router.post('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'POST produtos'
    });
});

router.get('/:id_produto', (req, res, next) => {
    const id = req.params.id_produto;

    if(id === 'especial'){
        res.status(200).send({
            mensagem: 'GET produtos com parametro especial',
            id: id
        });
    }else{
        res.status(200).send({
            mensagem: 'GET produtos com parametros',
            id: id
        });
    }
});

router.patch('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'PATCH produtos'
    });
});

router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'DELETE produtos'
    });
});



module.exports = router;
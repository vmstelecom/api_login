const { Router } = require('express');
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'GET pedidos'
    });
});

router.post('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'POST pedidos'
    });
});

router.get('/:id_pedido', (req, res, next) => {
    const id = req.params.id_pedido;

    if(id === 'especial'){
        res.status(200).send({
            mensagem: 'GET pedidos com parametro especial',
            id: id
        });
    }else{
        res.status(200).send({
            mensagem: 'GET pedidos com parametros',
            id: id
        });
    }
});

router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'DELETE pedidos'
    });
});



module.exports = router;
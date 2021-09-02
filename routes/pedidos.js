const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'GET pedidos'
    });
});

router.post('/', (req, res, next) => {

    const pedido = {
        id_produto: req.body.id_produto,
        quantidade: req.body.quantidade
    };

    res.status(201).send({
        mensagem: 'POST pedidos',
        pedidoCriado: pedido
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
const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error})}
        conn.query(
            'SELECT * FROM clientes',
            (error, result, field) => {
                if(error) { return res.status(500).send({ error: error})}
                const response = {
                    quantidade: result.length,
                    clientes: result.map(cli => {
                        return {
                            id_cli: cli.id_cli,
                            nome: cli.nome,
                            email: cli.email,
                            telefone: cli.telefone,
                            cidade: cli.cidade,
                            estado: cli.estado,
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna todos os clientes',
                                url: 'http://localhost:3000/clientes/' + cli.id_cli
                            }
                        }
                    })
                }
                return res.status(200).send(response);
            }
            )
    });
});

router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error})}
        conn.query(
            `INSERT INTO clientes ( nome, email, telefone, cidade, estado) VALUES (?,?,?,?,?)`,
            [
                req.body.nome,
                req.body.email,
                req.body.telefone,
                req.body.cidade,
                req.body.estado,
            ],
            (error, result, field) => {
                conn.release();
                if(error) { return res.status(500).send({ error: error})}
                const response = {
                    mensagem: 'Cliente inserido',
                    clienteCriado: {
                        id_cli: result.id_cli,
                        nome: req.body.nome,
                        email: req.body.email,
                        telefone: req.body.telefone,
                        cidade: req.body.cidade,
                        estado: req.body.estado,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna todos os clentes',
                            url: 'http://localhost:3000/clientes'
                        }
                    }
                }
                return res.status(201).send(response);
            }
        );
    });
});

router.get('/:id_cli', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error})}
        conn.query(
            'SELECT * FROM clientes WHERE id_cli = ?;',
            [req.params.id_cli],
            (error, result, field) => {
                if(error) { return res.status(500).send({ error: error})}

                if(result.length == 0){
                    return res.status(404).send({
                        mensagem: 'Este id não existe'
                    });
                }
                const response = {
                    mensagem: 'Cliente especifico',
                    cliente: {
                        id_cli: result[0].id_cli,
                        nome: result[0].nome,
                        email: result[0].email,
                        telefone: result[0].telefone,
                        cidade: result[0].cidade,
                        estado: result[0].estado,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna todos os clientes',
                            url: 'http://localhost:3000/clientes'
                        }
                    }
                }
                return res.status(200).send(response);
            }
            )
    });
});

router.patch('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error})}
        conn.query(
            'UPDATE clientes SET nome=?, email=?, telefone=?, cidade=?, estado=? WHERE id_cli = ?;',
            [
                req.body.nome,
                req.body.email,
                req.body.telefone,
                req.body.cidade,
                req.body.estado,
                req.body.id_cli
            ],
            (error, result, field) => {
                conn.release();
                if(error) { return res.status(500).send({ error: error})}
                const response = {
                    mensagem: 'Cliente atualizado',
                    clienteAtualizado: {
                        id_cli: req.body.id_cli,
                        nome: req.body.nome,
                        email: req.body.email,
                        telefone: req.body.telefone,
                        cidade: req.body.cidade,
                        estado: req.body.estado,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna o cliente alterado',
                            url: 'http://localhost:3000/clientes/' + req.body.id_cli
                        }
                    }
                }
                res.status(202).send(response);
            }
        );
    });
});

router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error})}
        conn.query(
            'DELETE FROM clientes WHERE id_cli = ?;',
            [req.body.id_cli],
            (error, result, field) => {
                conn.release();
                if(error) { return res.status(500).send({ error: error})}
                const response = {
                    mensagem: 'Cliente removido',
                    request: {
                        tipo: 'POST',
                        descricao: 'Inserir novo cliente',
                        url: 'http://localhost:3000/clientes',
                        body: {
                            nome: "String",
                            email: "String",
                            telefone: "String",
                            cidade: "String",
                            estado: "String"
                        }
                    }
                }
                return res.status(202).send(response);
            }
        );
    });
});



module.exports = router;
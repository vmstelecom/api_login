const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error})}
        conn.query(
            `CREATE TABLE IF NOT EXISTS clientes
                (id_cli INT NOT NULL AUTO_INCREMENT,
                nome VARCHAR(20),
                email VARCHAR(20),
                telefone VARCHAR(20),
                cidade VARCHAR(20),
                estado VARCHAR(2),
                dcad TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (id_cli)
                );`,
            (error, result, field) => {
                conn.release();
                if(error) { return res.status(500).send({ error: error})}
                const response = {
                    mensagem: 'Tabela criada'
                }
                return res.status(201).send(response);
            }
        );
    });
});

module.exports = router;
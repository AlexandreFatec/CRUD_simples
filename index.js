var mysql = require('mysql2');
var config = require('./config')

var con = mysql.createConnection(config);

con.connect(function(err) {
    if (err) throw err;

    console.log('Conectado\n');

    //CREATE
    var sql = 'CREATE TABLE IF NOT EXISTS clientes1 (id INT NOT NULL AUTO_INCREMENT,' +
              'nome VARCHAR(255) NOT NULL, idade INT NOT NULL, uf VARCHAR(20) NOT NULL, PRIMARY KEY (id))';
    con.query(sql, function (err) {
        if (err) throw err;
        console.log('Tabela criada ou já existe\n');
    });
    
    //INSERT
    var insertsql = 'INSERT IGNORE clientes1 (id, nome, idade, uf) VALUES (3, "Max", 25, "SP")';
    con.query(insertsql, function (err) {
        if (err) throw err;
        console.log('Registro inserido\n');
    });

    //READ
    con.query("SELECT * FROM clientes1", function (err, result) {
        if (err) throw err;
        console.log('Esses são os dados iniciais da tabela:');
        console.log(result);
    });

    //READ COM FILTRO
    con.query("SELECT * FROM clientes1 WHERE nome = 'Lucas'", function (err, result) {
        if (err) throw err;
        console.log('\nFiltrando por nome:');
        console.log(result);
    });

    //UPDATE
    var updatesql = "UPDATE clientes1 SET nome = 'Maria Luiza' WHERE nome = 'Maria'";
    con.query(updatesql, function (err, result) {
        if (err) throw err;
        console.log("\nRegistro alterado\n");
    });

    //DELETE
    var deletesql = 'DELETE FROM clientes1 WHERE id = 3';
    con.query(deletesql, function (err) {
        if (err) throw err;
        console.log('Registro deletado');
    });

    //READ após o delete
    con.query("SELECT * FROM clientes1", function (err, result) {
        if (err) throw err;
        console.log("\nDados após o delete:");
        console.log(result);
    });

});

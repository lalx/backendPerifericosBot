import Perifericos from "../Models/perifericosModel.js";
import conectar from "./conexao.js";

export default class PerifericosDAO{

    async gravar(perifericos){
        if(perifericos instanceof Perifericos){
            const sql = 'INSERT INTO tb_perifericos (categoria, modelo, marca, valor, urlImagem) VALUES (?, ?, ?, ?, ?)';
            const parametros = [perifericos.categoria, perifericos.modelo, perifericos.marca, perifericos.valor, perifericos.urlImagem];
            const conexao = await conectar();
            const resultado = await conexao.execute(sql, parametros);
            perifericos.codigo = resultado[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(perifericos){
        if(perifericos instanceof Perifericos){
            const sql = 'UPDATE tb_perifericos SET categoria = ?, modelo = ?, marca = ?, valor = ?, urlImagem = ? WHERE codigo = ?';
            const parametros = [perifericos.categoria, perifericos.modelo, perifericos.marca, perifericos.valor, perifericos.urlImagem, perifericos.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(perifericos){
        if(perifericos instanceof Perifericos){
            const sql = 'DELETE tb_perifericos WHERE codigo = ?';
            const parametros = [perifericos.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(pesquisa){
        let sql = "";
        if (pesquisa){
            sql = `SELECT * FROM tb_perifericos WHERE categoria LIKE '%${pesquisa}%'`;
        }
        else{
         sql =`SELECT * FROM tb_perifericos`;
        }
        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql);
        let listaPerifericos = [];
        for (const registro of registros){
            const periferico = new Perifericos(registro.codigo, registro.categoria, registro.modelo, registro.marca, registro.valor, registro.urlImagem);
            listaPerifericos.push(periferico);
        }
        global.poolConexoes.releaseConnection(conexao);
        return listaPerifericos;
    }

}
import Pedido from "../Models/pedidosModel.js";
import conectar from "./conexao.js";

export default class PedidoDAO{
    async gravar(pedido){
        if (pedido instanceof Pedido){
            const conexao = await conectar();
            let sql = `INSERT INTO pedido (dataPedido) VALUES (?);`;
            let parametros = [pedido.dataPedido];
            const resultado = await conexao.execute(sql, parametros);
            pedido.id = resultado[0].insertId;
            for (const item of pedido.itensPedidos){
                sql = `SELECT codigo FROM tb_perifericos WHERE categoria like ?`;
                const [registros] = await conexao.execute(sql, ['%' + item.tb_perifericos + '%']);
                item.codigo = registros[0].codigo;
                sql = `
                    INSERT INTO pedido_perifericos(fk_id_pedido, fk_codigo_periferico, qtd)
                    VALUES (?,?,?);
                `
                parametros = [pedido.id, item.codigo, item.qtd];
                await conexao.execute(sql, parametros);
            }
            global.poolConexoes.releaseConnection(conexao);
        }
    }
}
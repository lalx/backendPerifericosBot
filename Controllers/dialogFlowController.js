import { obterCardPerifericos } from "../functionsDialogFlow/functionsDLFlow.js";
import Pedido from '../Models/pedidosModel.js';
import Perifericos from "../Models/perifericosModel.js";

export default class DialogFlowController {

    processarIntencoes(req, res) {
        if (req.method === 'POST') {
            const intencao = req.body.queryResult.intent.displayName;

            const origem = req.body?.originalDetectIntentRequest?.source;
            if (intencao === 'intencao-usuario') {
                if (origem) {
                    obterCardPerifericos('custom').then((listaCards) => {
                        let respostaDF = {
                            "fulfillmentMessages": []
                        }
                        respostaDF.fulfillmentMessages.push({
                            "text": {
                                "text": [
                                    "Bem vindo à Periféricos Gamer! \n",
                                    "Esses são nossos produtos: \n"
                                ]
                            }
                        });
                        respostaDF.fulfillmentMessages.push(...listaCards);
                        respostaDF.fulfillmentMessages.push({
                            "text": {
                                "text": [
                                    "Qual produto você deseja?"
                                ]
                            }
                        })
                        res.json(respostaDF);
                    }).catch((erro) => {
                        let respostaDF = {
                            "fulfillmentMessages": [{
                                "text": {
                                    "text": [
                                        "Erro ao recuperar o produto: \n",
                                        "Não foi possível consultar o menu de produtos!",
                                        "Desculpe pelo transtorno!"
                                    ]
                                }
                            }]
                        }
                        res.json(respostaDF);
                    })

                }
                else {
                    obterCardPerifericos('messenger').then((listaCards) => {
                        let respostaDF = {
                            "fulfillmentMessages": []
                        }
                        respostaDF.fulfillmentMessages.push({
                            "payload": {
                                "richContent": [[{
                                    "type": "description",
                                    "title": "Bem vindo à Periféricos Gamer!",
                                    "text": [
                                        "Estamos muito felizes em ter você por aqui!",
                                        "Esses são nossos produtos à venda: \n"
                                    ]
                                }]]
                            }
                        });
                        respostaDF.fulfillmentMessages[0].payload.richContent[0].push(...listaCards);
                        respostaDF.fulfillmentMessages[0].payload.richContent[0].push({
                            "type": "description",
                            "title": "Qual produto você deseja?",
                            "text": []
                        });
                        res.json(respostaDF);
                    }).catch((erro) => {
                        let respostaDF = {
                            "fulfillmentMessages": []
                        }
                        respostaDF.fulfillmentMessages.push({
                            "payload": {
                                "richContent": [[{
                                    "type": "description",
                                    "title": "Erro ao recuperar o produto: \n",
                                    "text": [
                                        "Não foi possível consultar o menu de produtos!",
                                        "Desculpe pelo transtorno!"
                                    ]
                                }]]
                            }
                        });

                    })
                }
            }
            else if (intencao === "pedido-finalizado") {
                let perifericos = [];
                let qtds = [];
                for (const contexto of requisicao.body.queryResult.outputContexts) {
                    if (contexto.parameters.periferico) {
                        perifericos = contexto.parameters.periferico;
                        qtds = contexto.parameters.number;
                    }
                }

                const dataHoje = new Date().toLocaleDateString();
                let itensPedido = [];
                for (let i = 0; i < perifericos.length; i++) {

                    itensPedido.push({
                        "codigo":0,
                        "periferico": perifericos[i],
                        "qtd": qtds[i]
                    });

                }
                const enderecoEntrega = `Rua: ${requisicao.body.queryResult.parameters.location['street-address']} \n
                Cidade: ${requisicao.body.queryResult.parameters.location.city} / 
                ${requisicao.body.queryResult.parameters.location["admin-area"]} \n
                `;
                const pedido = new Pedido(0, dataHoje, itensPedido);
                pedido.gravar().then(() => {
                    if (origem) {
                        let respostaDF = {
                            "fulfillmentMessages": [{
                                "text": {
                                    "text": [
                                        `Pedido nº ${pedido.id} foi registrado com sucesso! \n`,
                                        `Em um prazo de 3 a 5 dias úteis seu pedido será entregue no seguinte endereço: ${enderecoEntrega} `,
                                        `Obrigado pela preferência!`,
                                        `Agradecemos o seu contato!`
                                    ]
                                }
                            }]
                        }
                        resposta.json(respostaDF);
                    }
                    else {
                        let respostaDF = {
                            "fulfillmentMessages": []
                        }
                        respostaDF.fulfillmentMessages.push({
                            "payload": {
                                "richContent": [[{
                                    "type": "description",
                                    "title": `Pedido nº ${pedido.id} foi registrado com sucesso! \n`,
                                    "text": [
                                        `Em um prazo de 3 a 5 dias úteis seu pedido será entregue no seguinte endereço: ${enderecoEntrega} `,
                                        `Obrigado pela preferência!`,
                                        `Agradecemos o seu contato!`
                                    ]
                                }]]
                            }
                        });
                        resposta.json(respostaDF);
                    }
                })
                    .catch((erro) => {
                        if (origem) {
                            let respostaDF = {
                                "fulfillmentMessages": [{
                                    "text": {
                                        "text": [
                                            `Erro ao registrar o seu pedido! \n`,
                                            `Erro: ${erro.message}`,
                                            `Entre em contato pelo telefone (11) 99999-9999`,
                                            `Agradecemos o seu contato!`
                                        ]
                                    }
                                }]
                            }
                            resposta.json(respostaDF);
                        }
                        else {
                            let respostaDF = {
                                "fulfillmentMessages": []
                            }
                            respostaDF.fulfillmentMessages.push({
                                "payload": {
                                    "richContent": [[{
                                        "type": "description",
                                        "title": `Erro ao registrar o seu pedido! \n`,
                                        "text": [
                                            `Erro: ${erro.message}`,
                                            `Entre em contato pelo telefone (11) 99999-9999`,
                                            `Agradecemos o seu contato!`
                                        ]
                                    }]]
                                }
                            });
                        }
                    });
            }

        }
    }
}

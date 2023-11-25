import { obterCardPerifericos } from "../functionsDialogFlow/functionsDLFlow.js";

export default class DialogFlowController {

    processarIntencoes(req, res) {
        if (req.method === 'POST') {
            const intencao = req.body.queryResult.intent.displayName;

            const origem = req.body?.originalDetectIntentRequest?.source;
            if (intencao === 'resposta-padrão') {
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

        }
    }
}
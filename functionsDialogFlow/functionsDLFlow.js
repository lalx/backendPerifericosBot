//url de referência https://cloud.google.com/dialogflow/es/docs/integrations/dialogflow-messenger?hl=pt-br

import Perifericos from "../Models/perifericosModel.js";

export function criarMessengerCard(){
    return {
        type:"info",
        title:"",
        subtitle:"",
        image: {
            src : {
                rawUrl:""
            }
        },
        actionLink:""
    }
}

export function criarCustomCard(){
    return {
        card: {
            title:"",
            subtitle:"",
            imageUri:"",
            buttons: [
                {
                    text:"botão",
                    postback:""
                }
            ]
        }
    }
    
}

export async function obterCardPerifericos(tipoCard = 'custom'){
    const perifericoModel = new Perifericos();
    const listaPerifericos = await perifericoModel.consultar();
    const listaCards = [];
    for (const periferico of listaPerifericos){
        let cartao;
        if (tipoCard == 'custom'){
            cartao = criarCustomCard();
            cartao.card.title = periferico.categoria;
            cartao.card.subtitle = `modelo: ${periferico.modelo},
                                    marca: ${periferico.marca},
                                    valor: R$${periferico.valor}`;
            cartao.card.imageUri = periferico.urlImagem;
            cartao.card.buttons[0].text = "Clique aqui para mais informações";
            cartao.card.buttons[0].postback = "https://www.kabum.com.br";
        } 
        else{
            //card para messenger
            cartao = criarMessengerCard();
            cartao.title = periferico.categoria;
            cartao.subtitlesubtitle = `modelo: ${periferico.modelo},
                                       marca: ${periferico.marca},
                                       valor: R$${periferico.valor}`;
            cartao.image.src.rawUrl = periferico.urlImagem;
            cartao.actionLink = "https://www.kabum.com.br";
        }
        listaCards.push(cartao);
    }
    return listaCards;
}
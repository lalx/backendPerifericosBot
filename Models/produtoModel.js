export default class Produto{

    #codigo
    #categoria
    #modelo
    #marca
    #valor
    #urlImagem

    get codigo(){ return this.#codigo; }
    set codigo(codigo){ this.#codigo = codigo; }

    get categoria(){ return this.#categoria; }
    set categoria(categoria){ this.#categoria = categoria; }

    get modelo(){ return this.#modelo; }
    set modelo(modelo){ this.#modelo = modelo; }

    get marca(){ return this.#marca; }
    set marca(marca){ this.#marca = marca; }

    get valor(){ return this.#valor; }
    set valor(valor){ this.#valor = valor; }

    get urlImagem(){ return this.#urlImagem; }
    set urlImagem(urlImagem){ this.#urlImagem = urlImagem; }

    constructor(codigo, categoria, modelo, marca, valor, urlImagem){
        this.codigo = codigo;
        this.categoria = categoria;
        this.modelo = modelo;
        this.marca = marca;
        this.valor = valor;
        this.urlImagem = urlImagem;
    }

    toJSON(){
        return{
            'codigo': this.#codigo,
            'categoria': this.#categoria,
            'modelo': this.#modelo,
            'marca': this.#marca,
            'valor': this.#valor,
            'urlImagem': this.#urlImagem
        }
    }
}
import Produto from "./Models/produtoModel.js";

let produto = new Produto(1, "Mouse", "Sem Fio", "Hyperx", 100, "https://images.kabum.com.br/produtos/fotos/105010/mouse-sem-fio-gamer-hyperx-pulsefire-dart-rgb-16000dpi-hx-mc006b-_mouse-sem-fio-gamer-hyperx-pulsefire-dart-rgb-16000dpi-hx-mc006b-_1571411835_gg.jpg");

console.log(produto.toJSON());
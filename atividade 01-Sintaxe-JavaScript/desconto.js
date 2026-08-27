function calcularDesconto(preco, desconto){
    var valorDesconto = preco * (desconto / 100)
    var valorFinal = preco - desconto

    console.log(valorFinal)
}

var preco = 100
var desconto = 10

calcularDesconto(preco, desconto)

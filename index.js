// Variaveis globais

// Responsavel por controlar o input de produto
const produtoInput = document.getElementById('produtoInpt');

// Responsavel por controlar o button de produto
const adicionarButton = document.getElementById('inptBtn');
adicionarButton.addEventListener('click', () => {
    let produto = {
        produtoNome: produtoInput.value,
        produtoValor: 0,
        jaTemValor: false
    }

    iziToast.info({
        title: 'Sucesso',
        message: 'Produto inserido na lista de compras!',
    });

    listaProdutos.push(produto);

    if (produto.produtoNome.length >= 8 && produto.produtoNome.length <= 64) {
        adicionarProdutoToListaCompras(produto.produtoNome);
    }

    produtoInput.value = '';

})

// Responsavel por controlar a lista de compras
const listaCompras = document.getElementById('listaCompras');

// Responsavel por controlar o valor do carrinho
const valorCarrinho = document.getElementById('valorTotal')

// Lista de produtos. Se existir algo no localStorage com a key passada, será isso; Se nao existir nd, é uma lista vazia
let listaProdutos = JSON.parse(localStorage.getItem('ProdutosSalvos')) || [];

listaProdutos.forEach((element) => {
    adicionarProdutoToListaCompras(element.produtoNome, element.jaTemValor);
})

atualizarValorCarrinho();

// Responsavel por adicionar produtos a lista de compras(tanto pelo input, quanto o localStorage)
function adicionarProdutoToListaCompras(nome, jaTemValor) {

    let produto = {
        produtoNome: '',
        produtoValor: 0,
        jaTemValor: false
    }

    // Cria um objeto de lista
    let objetoLista = document.createElement('li');

    // Cria um checkbox para o objeto da lista
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.style.height = '25px';
    checkbox.style.width = '25px';


    if (jaTemValor == true) {
        checkbox.disabled = true;
        checkbox.checked = true;
    }
    checkbox.addEventListener('click', () => {
        produto.produtoValor = adicionarValorAoProduto()
        atualizarValorCarrinho()

        let index = listaProdutos.findIndex((obj) => obj.produtoNome === produto.produtoNome)
        if (index > -1) {
            listaProdutos[index].produtoValor = produto.produtoValor;

            salvarListaProdutoLocalStorage(listaProdutos);
            atualizarValorCarrinho()
            listaProdutos[index].jaTemValor = true;
            checkbox.disabled = true;
        }

        salvarListaProdutoLocalStorage(listaProdutos)
    })

    // Cria o nome do produto para o objeto da lista
    let nomeProduto = document.createElement('span');
    nomeProduto.innerHTML = nome;
    nomeProduto.style.display = 'flex';
    nomeProduto.style.alignItems = 'center';
    nomeProduto.style.gap = '15px';
    nomeProduto.style.fontSize = '25px';
    nomeProduto.style.height = '40px'

    produto.produtoNome = nome;

    // Cria o btn para o objeto da lista
    let removerButton = document.createElement('img');
    removerButton.src = 'https://upload.wikimedia.org/wikipedia/en/thumb/6/61/Cross_icon_%28white%29.svg/1024px-Cross_icon_%28white%29.svg.png';
    removerButton.addEventListener('click', () => {
        listaCompras.removeChild(objetoLista);
        iziToast.info({
            title: 'Aviso',
            message: 'Produto removido com sucesso!',
        });
        removerItemDaListaCompras(produto);
        salvarListaProdutoLocalStorage(listaProdutos)
    })

    objetoLista.append(checkbox, nomeProduto, removerButton);

    listaCompras.appendChild(objetoLista);

    salvarListaProdutoLocalStorage(listaProdutos);

    return produto;
}

// Responsavel por salvar o objeto em localStorage
function salvarListaProdutoLocalStorage(listaProdutos) {
    localStorage.setItem('ProdutosSalvos', JSON.stringify(listaProdutos))
}

// Responsavel por obter o objeto do localStorage
function carregarListaProdutosLocalStorage() {
    listaProdutos = JSON.parse(localStorage.getItem('ProdutosSalvos'));
    atualizarValorCarrinho();
}

// Responsavel por remover itens da lista de compras
function removerItemDaListaCompras(objetoLista) {

    let index = listaProdutos.findIndex((obj) => obj.produtoNome === objetoLista.produtoNome)
    if (index > -1) {
        listaProdutos.splice(index, 1);
        atualizarValorCarrinho();
        salvarListaProdutoLocalStorage(listaProdutos);
    }

}

// Responsavel por atualizar o valor do carrinho
function atualizarValorCarrinho() {
    let totalCarrinho = 0;

    listaProdutos.forEach((obj) => {
        totalCarrinho += Number(obj.produtoValor);
    })

    valorCarrinho.innerHTML = `R$ ${totalCarrinho.toFixed(2)}`
}

// Responsavel por adicionar valor ao produto
function adicionarValorAoProduto() {
    let valor = 'a';

    while (isNaN(valor) == true) {
        valor = Number(prompt('Insira o valor do produto'));
    }

    return valor;
}
const lista = document.getElementById('listaCompras');

let htmlSaved = document.getElementsByTagName('html');

const inpt = document.getElementById('produtoInpt');

const inptBtn = document.getElementById('inptBtn');
inptBtn.innerHTML = 'Adicionar';

const valorTotal = document.getElementById('valorTotal');

let total = Number(0);

inptBtn.addEventListener('click', () => {
    if (inpt.value !== '') {
        if (inpt.value.length >= 8 && inpt.value.length <= 64) {
            let produto = document.createElement('li');
            lista.prepend(produto);
            produto.innerHTML = inpt.value;
            produto.setAttribute('style', 'display: flex;align-items: center;gap: 15px;font-size: 25px;height: 40px;');
            inpt.value = '';

            let checkbox = document.createElement('input');
            checkbox.setAttribute('type', 'checkbox');
            checkbox.setAttribute('style', 'height: 25px;width: 25px;');
            let promptValue = 'a';
            checkbox.addEventListener('click', () => {
                if (checkbox.checked) {
                    promptValue = 'a';

                    while (isNaN(promptValue) == true) {
                        promptValue = prompt(`Insira o valor do produto ${produto.textContent.toUpperCase()}`);
                    }

                    total += Number(promptValue);

                    valorTotal.textContent = `R$ ${Number(total)}`;

                    checkbox.disabled = true;

                    produto.setAttribute('style', 'text-decoration: line-through;');
                }

            });

            produto.prepend(checkbox);

            let img = document.createElement('img');
            img.src = 'https://upload.wikimedia.org/wikipedia/en/thumb/6/61/Cross_icon_%28white%29.svg/1024px-Cross_icon_%28white%29.svg.png';
            img.addEventListener('click', () => {
                lista.removeChild(produto);
            })

            produto.append(img)
        }
        
        localStorage.setItem('teste', JSON.stringify(htmlSaved));

    }

});
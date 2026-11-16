// ================= LÓGICA DA TELA 1: LOGIN =================
const formLogin = document.getElementById('formLogin');

if (formLogin) {
    formLogin.addEventListener('submit', function(evento) {
        evento.preventDefault();

        const usuario = document.getElementById('login').value.trim();
        const senha = document.getElementById('senha').value.trim();

        if (usuario === '' || senha === '') {
            alert('Por favor, preencha o login e a senha!');
            return;
        }

        localStorage.setItem('usuarioLogado', usuario);
        window.location.href = 'pages/menu.html';
    });
}

// ================= LÓGICA DA TELA 2: CARDÁPIO =================
const boasVindas = document.getElementById('boasVindas');
const contadorCarrinho = document.getElementById('contadorCarrinho');
const btnIrPagamento = document.getElementById('btnIrPagamento');

// Busca o carrinho salvo no navegador ou cria uma lista vazia []
let carrinho = JSON.parse(localStorage.getItem('carrinhoEsquina')) || [];

// Se estivermos na tela menu.html, atualiza o nome do usuário e o contador
if (boasVindas) {
    const nomeSalvo = localStorage.getItem('usuarioLogado');
    if (nomeSalvo) {
        boasVindas.textContent = `Olá, ${nomeSalvo}!`;
    }
    atualizarContador();
}

// Função chamada pelo onclick dos botões "+ Adicionar"
function adicionarAoCarrinho(nomeItem, precoItem) {
    carrinho.push({ nome: nomeItem, preco: precoItem });
    
    // Salva a lista atualizada no localStorage
    localStorage.setItem('carrinhoEsquina', JSON.stringify(carrinho));
    
    atualizarContador();
    alert(`${nomeItem} adicionado ao pedido!`);
}

function atualizarContador() {
    if (contadorCarrinho) {
        contadorCarrinho.textContent = carrinho.length;
    }
}

// Leva para a Tela 3 (Pagamento + Endereço)
if (btnIrPagamento) {
    btnIrPagamento.addEventListener('click', function() {
        if (carrinho.length === 0) {
            alert('Seu carrinho está vazio! Escolha pelo menos 1 item.');
            return;
        }
        // Como menu.html e pagamento.html estão na mesma pasta pages/, basta o nome do arquivo
        window.location.href = 'pagamento.html';
    });
}

// ================= LÓGICA DA TELA 3: PAGAMENTO E ENDEREÇO =================
const listaResumo = document.getElementById('listaResumo');
const valorTotal = document.getElementById('valorTotal');
const formPagamento = document.getElementById('formPagamento');
const btnLimparCarrinho = document.getElementById('btnLimparCarrinho');

// Executa apenas se estivermos na página pagamento.html
if (listaResumo && formPagamento) {
    let total = 0;

    // 1. Percorre cada item salvo no carrinho e cria um <li> na tela
    carrinho.forEach(function(item) {
        const li = document.createElement('li');
        
        // Formata o preço de 7 para "R$ 7,00"
        const precoFormatado = item.preco.toFixed(2).replace('.', ',');
        
        li.innerHTML = `<span>${item.nome}</span> <strong>R$ ${precoFormatado}</strong>`;
        listaResumo.appendChild(li);

        total += item.preco;
    });

    // 2. Exibe o valor total somado
    valorTotal.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;

    // 3. Botão para esvaziar o carrinho e voltar ao cardápio
    btnLimparCarrinho.addEventListener('click', function() {
        localStorage.removeItem('carrinhoEsquina');
        alert('Carrinho esvaziado!');
        window.location.href = 'menu.html';
    });

    // 4. Finalização do pedido
    formPagamento.addEventListener('submit', function(evento) {
        evento.preventDefault();

        if (carrinho.length === 0) {
            alert('Seu carrinho está vazio!');
            window.location.href = 'menu.html';
            return;
        }

        const rua = document.getElementById('rua').value.trim();
        const numero = document.getElementById('numero').value.trim();
        const bairro = document.getElementById('bairro').value.trim();
        const pagamento = document.getElementById('formaPagamento').value;
        const usuario = localStorage.getItem('usuarioLogado') || 'Cliente';

        alert(
            `Pedido confirmado, ${usuario}!\n\n` +
            `Total: R$ ${total.toFixed(2).replace('.', ',')}\n` +
            `Pagamento: ${pagamento}\n` +
            `Entrega em: ${rua}, nº ${numero} - ${bairro}`
        );

        // Limpa o carrinho após concluir a compra e volta para a Home
        localStorage.removeItem('carrinhoEsquina');
        window.location.href = 'menu.html';
    });
}

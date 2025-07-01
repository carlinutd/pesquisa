// ============================
// Variáveis e Dados
// ============================

let timeoutId;

window.produtos = [
    {
        id: 1,
        nome: "Camisa Flamengo I 2024",
        descricao: "Camisa titular do Flamengo temporada 2024",
        preco: 299.90,
        imagem: "img/jogo21.webp",
        categoria: "jogo",
        tipo: "titular",
        ano: 2024,
        destaque: true
    },
    {
        id: 2,
        nome: "Camisa Flamengo II 2025",
        descricao: "Camisa reserva do Flamengo temporada 2025",
        preco: 279.90,
        imagem: "img/jogo25.png",
        categoria: "jogo",
        tipo: "reserva",
        ano: 2025,
        destaque: true
    },
    {
        id: 3,
        nome: "Camisa Flamengo I 2020",
        descricao: "Camisa 1 do Flamengo temporada 2020",
        preco: 289.90,
        imagem: "img/jogo21.webp",
        categoria: "jogo",
        tipo: "titular",
        ano: 2020,
        destaque: false
    },
    {
        id: 4,
        nome: "Camisa Retrô 1976",
        descricao: "Edição especial camisa retrô 1976",
        preco: 349.90,
        imagem: "img/retro76.webp",
        categoria: "retro",
        tipo: "classica",
        ano: 1976,
        destaque: true
    },
    {
        id: 6,
        nome: "Camisa de jogo 2019",
        descricao: "Camisa 2 de 2019 - Edição especial",
        preco: 249.90,
        imagem: "img/branca19.webp",
        categoria: "retro",
        tipo: "reserva",
        ano: 2019,
        destaque: false
    },
    {
        id: 5,
        nome: "Camisa Outubro Rosa 2021",
        descricao: "Camisa do outubro rosa de 2021",
        preco: 199.90,
        imagem: "img/rosa21.png",
        categoria: "especial",
        tipo: "comemorativa",
        ano: 2021,
        destaque: true
    },
    {
        id: 7,
        nome: "Camisa Centenário",
        descricao: "Edição comemorativa do centenário",
        preco: 399.90,
        imagem: "img/retro95.webp",
        categoria: "especial",
        tipo: "comemorativa",
        ano: 2012,
        destaque: true
    }
];

// ============================
// Funções
// ============================
function filtrarPorPesquisa(termo) {
    if (!termo) return window.produtos;
    termo = termo.toLowerCase().trim();
    return window.produtos.filter(produto => 
        produto.nome.toLowerCase().includes(termo) || 
        produto.descricao.toLowerCase().includes(termo) ||
        produto.tipo.toLowerCase().includes(termo) ||
        produto.ano.toString().includes(termo)
    );
}

function filtrarPorCategoria(categoria) {
    if (categoria === 'todos' || !categoria) {
        return window.produtos;
    }
    return window.produtos.filter(produto => produto.categoria === categoria);
}

function carregarProdutos(listaProdutos) {
    const container = document.querySelector('.product__grid');
    if (!container) {
        console.error('Container de produtos não encontrado!');
        return;
    }

    container.innerHTML = '';

    listaProdutos.forEach(produto => {
        const produtoHTML = `
            <div class="product__card">
                <div class="product__image-container">
                    <img src="${produto.imagem}" alt="${produto.nome}" 
                         onerror="this.src='img/placeholder.jpg'; this.onerror=null; this.alt='Imagem não disponível'">
                </div>
                <h3>${produto.nome}</h3>
                <p>${produto.descricao}</p>
                <span class="product__price">R$ ${produto.preco.toFixed(2).replace('.', ',')}</span>
                <button class="btn" data-id="${produto.id}">Comprar</button>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', produtoHTML);
    });
}

function aplicarFiltros() {
    const termoBusca = searchInput ? searchInput.value.trim() : '';
    const categoriaAtiva = document.querySelector('.filter-btn.active')?.dataset.cat || 'todos';
    
    let resultados = filtrarPorCategoria(categoriaAtiva);
    
    if (termoBusca) {
        resultados = filtrarPorPesquisa(termoBusca);
    }
    
    carregarProdutos(resultados);
}

// ============================
// Eventos
// ============================

document.addEventListener('DOMContentLoaded', () => {
    carregarProdutos(window.produtos);

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            aplicarFiltros();
        });
    });
});

// ============================
// Busca
// ============================

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            aplicarFiltros();
        }, 300);
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            aplicarFiltros();
        }
    });
}

if (searchButton) {
    searchButton.addEventListener('click', (e) => {
        e.preventDefault();
        aplicarFiltros();
    });
}
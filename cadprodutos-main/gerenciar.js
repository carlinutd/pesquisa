import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getDatabase, ref, get, update, remove } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyA8DJVJQlcXl3tocBZDaDkN4SyPGMhbuwA",
    authDomain: "carlosesse-4a9d1.firebaseapp.com",
    databaseURL: "https://carlosesse-4a9d1-default-rtdb.firebaseio.com",
    projectId: "carlosesse-4a9d1",
    storageBucket: "carlosesse-4a9d1.firebasestorage.app",
    messagingSenderId: "69265719612",
    appId: "1:69265719612:web:430330d8b012e2ba969e39"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();

// Elementos do formulário
const buscaCodigoProduto = document.getElementById('buscaCodigoProduto');
const editarNomeProduto = document.getElementById('editarNomeProduto');
const editarCategoriaProduto = document.getElementById('editarCategoriaProduto');
const editarQuantidadeProduto = document.getElementById('editarQuantidadeProduto');
const editarValorProduto = document.getElementById('editarValorProduto');
const dadosProduto = document.getElementById('dadosProduto');

// Botões
const btnBuscarProduto = document.getElementById('btnBuscarProduto');
const btnAtualizarProduto = document.getElementById('btnAtualizarProduto');
const btnExcluirProduto = document.getElementById('btnExcluirProduto');
const btnLimparBusca = document.getElementById('btnLimparBusca');

// Função para buscar produto
function buscarProduto() {
    const codigo = buscaCodigoProduto.value;
    
    if (!codigo) {
        alert('Digite um código para buscar');
        return;
    }

    get(ref(db, 'Produtos/' + codigo))
        .then((snapshot) => {
            if (snapshot.exists()) {
                const produto = snapshot.val();
                editarNomeProduto.value = produto.nome;
                editarCategoriaProduto.value = produto.categoria || '';
                editarQuantidadeProduto.value = produto.quantidade || '';
                editarValorProduto.value = produto.valor || '';
                
                dadosProduto.style.display = 'block';
            } else {
                alert('Produto não encontrado!');
                dadosProduto.style.display = 'none';
            }
        })
        .catch((error) => {
            console.error('Erro ao buscar:', error);
            alert('Erro ao buscar produto');
        });
}

// Função para atualizar produto
function atualizarProduto() {
    const codigo = buscaCodigoProduto.value;
    
    if (!codigo) {
        alert('Nenhum produto selecionado para atualização');
        return;
    }

    update(ref(db, 'Produtos/' + codigo), {
        nome: editarNomeProduto.value,
        categoria: editarCategoriaProduto.value,
        quantidade: editarQuantidadeProduto.value,
        valor: editarValorProduto.value
    }).then(() => {
        alert('Produto atualizado com sucesso!');
    }).catch((error) => {
        console.error('Erro ao atualizar:', error);
        alert('Erro ao atualizar produto');
    });
}

// Função para excluir produto
function excluirProduto() {
    const codigo = buscaCodigoProduto.value;
    
    if (!codigo) {
        alert('Nenhum produto selecionado para exclusão');
        return;
    }

    if (confirm('Tem certeza que deseja excluir este produto?')) {
        remove(ref(db, 'Produtos/' + codigo))
            .then(() => {
                alert('Produto excluído com sucesso!');
                limparBusca();
            })
            .catch((error) => {
                console.error('Erro ao excluir:', error);
                alert('Erro ao excluir produto');
            });
    }
}

// Função para limpar busca
function limparBusca() {
    buscaCodigoProduto.value = '';
    editarNomeProduto.value = '';
    editarCategoriaProduto.value = '';
    editarQuantidadeProduto.value = '';
    editarValorProduto.value = '';
    dadosProduto.style.display = 'none';
}

// Event listeners
btnBuscarProduto.addEventListener('click', buscarProduto);
btnAtualizarProduto.addEventListener('click', atualizarProduto);
btnExcluirProduto.addEventListener('click', excluirProduto);
btnLimparBusca.addEventListener('click', limparBusca);
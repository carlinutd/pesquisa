// Configuração do Firebase (mesma do exemplo anterior)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getDatabase, ref, child, get, set, update, remove } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCe4iYHsApW4RpCl8-v0NgtUZP15RCcqsk",
    authDomain: "firestore-bcfb7.firebaseapp.com",
    databaseURL: "https://firestore-bcfb7-default-rtdb.firebaseio.com",
    projectId: "firestore-bcfb7",
    storageBucket: "firestore-bcfb7.appspot.com",
    messagingSenderId: "405005781101",
    appId: "1:405005781101:web:b7a64ef31fc86721a69764"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();

// Elementos do formulário de cadastro
let idCliente = document.getElementById('idCliente');
let nomeCliente = document.getElementById('nomeCliente');
let emailCliente = document.getElementById('emailCliente');
let telefoneCliente = document.getElementById('telefoneCliente');
let enderecoCliente = document.getElementById('enderecoCliente');

// Elementos da busca e atualização
let buscaIdCliente = document.getElementById('buscaIdCliente');
let dadoNomeCliente = document.getElementById('dadoNomeCliente');
let dadoEmailCliente = document.getElementById('dadoEmailCliente');
let dadoTelefoneCliente = document.getElementById('dadoTelefoneCliente');
let dadoEnderecoCliente = document.getElementById('dadoEnderecoCliente');

// Botões
let cadastrarCliente = document.getElementById('cadastrarCliente');
let buscarCliente = document.getElementById('buscarCliente');
let atualizarCliente = document.getElementById('atualizarCliente');
let deletarCliente = document.getElementById('deletarCliente');

// Função para cadastrar cliente
function AddCliente() {
    set(ref(db, 'Clientes/' + idCliente.value), {
        id: idCliente.value,
        nome: nomeCliente.value,
        email: emailCliente.value,
        telefone: telefoneCliente.value,
        endereco: enderecoCliente.value
    }).then(() => {
        idCliente.value = '';
        nomeCliente.value = '';
        emailCliente.value = '';
        telefoneCliente.value = '';
        enderecoCliente.value = '';
        alert("Cliente cadastrado com sucesso!");
    }).catch((error) => {
        console.error(error);
        alert("Erro ao cadastrar cliente!");
    });
}

// Função para buscar cliente
function PesquisarCliente() {
    const dbRef = ref(db);
    get(child(dbRef, 'Clientes/' + buscaIdCliente.value)).then((snapshot) => {
        if (snapshot.exists()) {
            dadoNomeCliente.value = snapshot.val().nome;
            dadoEmailCliente.value = snapshot.val().email;
            dadoTelefoneCliente.value = snapshot.val().telefone;
            dadoEnderecoCliente.value = snapshot.val().endereco;
            alert("Cliente encontrado!");
        } else {
            alert("Cliente não encontrado!");
        }
    }).catch((error) => {
        console.error(error);
        alert("Erro na busca!");
    });
}

// Função para atualizar cliente
function AtualizarCliente() {
    update(ref(db, 'Clientes/' + buscaIdCliente.value), {
        nome: dadoNomeCliente.value,
        email: dadoEmailCliente.value,
        telefone: dadoTelefoneCliente.value,
        endereco: dadoEnderecoCliente.value
    }).then(() => {
        alert("Cliente atualizado com sucesso!");
    }).catch((error) => {
        console.error(error);
        alert("Erro ao atualizar cliente!");
    });
}

// Função para deletar cliente
function DeletarCliente() {
    remove(ref(db, 'Clientes/' + buscaIdCliente.value)).then(() => {
        buscaIdCliente.value = '';
        dadoNomeCliente.value = '';
        dadoEmailCliente.value = '';
        dadoTelefoneCliente.value = '';
        dadoEnderecoCliente.value = '';
        alert("Cliente deletado com sucesso!");
    }).catch((error) => {
        console.error(error);
        alert("Erro ao deletar cliente!");
    });
}

// Event listeners
cadastrarCliente.addEventListener('click', AddCliente);
buscarCliente.addEventListener('click', PesquisarCliente);
atualizarCliente.addEventListener('click', AtualizarCliente);
deletarCliente.addEventListener('click', DeletarCliente);
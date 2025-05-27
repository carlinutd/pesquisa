// Menu Mobile
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    const isOpen = navLinks.classList.contains("open");
    menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
    if (e.target.tagName !== "A") return;
    navLinks.classList.remove("open");
    menuBtnIcon.setAttribute("class", "ri-menu-line");
});

// Sistema de Busca
const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");

searchButton.addEventListener("click", performSearch);
searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") performSearch();
});

function performSearch() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm !== "") {
        alert(`Buscando por: ${searchTerm}`);
    }
}

// Modal de Login
const loginBtn = document.getElementById("loginBtn");
const loginModal = document.getElementById("loginModal");
const closeModal = document.querySelector(".close-modal");

if (loginBtn) {
    loginBtn.addEventListener("click", (e) => {
        e.preventDefault();
        loginModal.style.display = "flex";
    });
}

if (closeModal) {
    closeModal.addEventListener("click", () => {
        loginModal.style.display = "none";
    });
}

window.addEventListener("click", (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = "none";
    }
});

// Firebase Authentication
const firebaseConfig = {
    apiKey: "AIzaSyC3MqZIkbIZvOH3auioEUZu9skvsfh_WHY",
    authDomain: "controle-58d26.firebaseapp.com",
    projectId: "controle-58d26",
    storageBucket: "controle-58d26.appspot.com",
    messagingSenderId: "342449654332",
    appId: "1:342449654332:web:4f3aad81bd874e984e9139"
};

firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

const userProfile = document.getElementById("userProfile");
const userEmail = document.getElementById("userEmail");
const logoutBtn = document.getElementById("logoutBtn");
const loginForm = document.querySelector(".login-form");

firebase.auth().onAuthStateChanged(function(user) {
    updateAuthUI(user);
});

function updateAuthUI(user) {
    if (user) {
        if (loginBtn) loginBtn.style.display = "none";
        if (userProfile) {
            userProfile.style.display = "flex";
            if (userEmail) userEmail.textContent = user.email.split("@")[0];
        }
        localStorage.setItem("userEmail", user.email);
    } else {
        if (loginBtn) loginBtn.style.display = "flex";
        if (userProfile) userProfile.style.display = "none";
        localStorage.removeItem("userEmail");
    }
}

if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        firebase.auth().signOut().then(() => {
            window.location.reload();
        });
    });
}

if (loginForm) {
    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                loginModal.style.display = "none";
                window.location.reload();
            })
            .catch((error) => {
                alert(getErrorMessage(error));
            });
    });
}

function getErrorMessage(error) {
    switch (error.code) {
        case "auth/user-not-found":
            return "Usuário não encontrado";
        case "auth/wrong-password":
            return "Senha incorreta";
        case "auth/invalid-email":
            return "E-mail inválido";
        default:
            return "Erro ao fazer login: " + error.message;
    }
}

function formatarPreco(preco) {
    return preco.toFixed(2).replace(".", ",");
}




    // Reatribui evento de compra
    container.querySelectorAll(".btn").forEach(btn => {
        btn.addEventListener("click", function() {
            const idProduto = parseInt(this.getAttribute("data-id"));
            const produto = produtos.find(p => p.id === idProduto);
            if (produto) {
                const user = firebase.auth().currentUser;
                if (user) {
                    alert(`"${produto.nome}" adicionado ao carrinho!`);
                } else {
                    alert("Faça login para adicionar itens ao carrinho");
                    loginModal.style.display = "block";
                }
            }
        });
    });

// Filtros de categoria
document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", function() {
        const categoria = this.getAttribute("data-cat");
        const produtosFiltrados = filtrarPorCategoria(categoria);
        carregarProdutos(produtosFiltrados);

        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        this.classList.add("active");
    });
});

// Inicialização
document.addEventListener("DOMContentLoaded", function() {
    // Verifica se há usuário logado
    const savedEmail = localStorage.getItem("userEmail");
    if (savedEmail) {
        const user = { email: savedEmail };
        updateAuthUI(user);
    }

    // Carrega produtos (usando a função do dados.js)
    if (typeof produtos !== 'undefined') {
        carregarProdutos(produtos);
    }
});
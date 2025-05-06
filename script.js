function exibirResultados(itens) {
    let section = document.getElementById("resultados-pesquisa");
    section.innerHTML = ""; // Limpa os resultados anteriores

    if (itens.length === 0) {
        section.innerHTML = "<p>Nenhum resultado encontrado.</p>";
        return;
    }

    itens.forEach(dado => {
        let itemDiv = document.createElement("div");
        itemDiv.classList.add("item-resultado");

        let titulo = document.createElement("h2");
        let link = document.createElement("a");
        link.href = dado.link;
        link.target = "_blank";
        link.textContent = dado.nome;
        titulo.appendChild(link);

        let descricao = document.createElement("p");
        descricao.classList.add("descricao-meta");
        descricao.textContent = dado.descricao;

        let img = document.createElement("img");
        img.src = dado.imagem;
        img.alt = dado.nome;
        img.style.width = "100px"; 
        img.style.display = dado.imagem ? "block" : "none"; // Se não houver imagem, não exibe

        itemDiv.appendChild(img);
        itemDiv.appendChild(titulo);
        itemDiv.appendChild(descricao);

        section.appendChild(itemDiv);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    exibirResultados(dados);
});

function pesquisar() {
    let campoPesquisa = document.getElementById("campo-pesquisa").value.toLowerCase().trim();

    let resultadosFiltrados = dados.filter(dado =>
        dado.nome.toLowerCase().includes(campoPesquisa)
    );

    exibirResultados(resultadosFiltrados);
}

document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.querySelector('.login-btn');
    const loginPopup = document.getElementById('loginPopup');
    const closeLogin = document.getElementById('closeLogin');
    const loginForm = document.getElementById('loginForm');
  
    // Abrir popup
    loginBtn.addEventListener('click', function(e) {
      e.preventDefault();
      loginPopup.classList.add('active');
    });
  
    // Fechar popup
    closeLogin.addEventListener('click', function() {
      loginPopup.classList.remove('active');
    });
  
    // Fechar ao clicar fora
    loginPopup.addEventListener('click', function(e) {
      if (e.target === loginPopup) {
        loginPopup.classList.remove('active');
      }
    });
  
    // Submeter formulário
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;
      
      // Aqui você pode adicionar a lógica de autenticação
      console.log('Email:', email);
      console.log('Senha:', password);
      
      // Simulando login bem-sucedido
      alert('Login realizado com sucesso!');
      loginPopup.classList.remove('active');
      loginForm.reset();
    });
  });
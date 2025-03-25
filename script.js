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


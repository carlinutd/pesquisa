function exibirResultados(itens) {
    let section = document.getElementById("resultados-pesquisa");
    let resultados = "";

    itens.forEach(dado => {
        resultados += `
            <div class="item-resultado">
                <h2><a href="${dado.link}" target="_blank">${dado.nome}</a></h2>
                <p class="descricao-meta">${dado.descricao}</p>
                <a href="${dado.link}" target="_blank" rel="noopener noreferrer">Mais Informações</a>
            </div>
        `;
    });

    section.innerHTML = resultados || "<p>Nenhum resultado encontrado.</p>";
}

document.addEventListener("DOMContentLoaded", function () {
    exibirResultados(dados);
});

function pesquisar() {
    let campoPesquisa = document.getElementById("campo-pesquisa").value.toLowerCase().trim();

    if (campoPesquisa === "") {
        exibirResultados(dados);
        return;
    }

    let resultadosFiltrados = dados.filter(dado =>
        dado.nome.toLowerCase().includes(campoPesquisa)
    );

    exibirResultados(resultadosFiltrados);
}


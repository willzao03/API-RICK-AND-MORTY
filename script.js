/***********************************************************************************************************
* Objetivo: Integração com API do Rick and Morty.
* Data: 03/11/2025
* Autor: Willian Gabriel da costa
* Git:https://github.com/willzao03/Games 
************************************************************************************************************/


const divCards = document.querySelector(".container--cards")
const nameFilter = document.getElementById("filter")

// Retorna todos os personagens
let allPersonagens = []

const displayCards = (characters) => {
    // Limpa os cards atuais
    divCards.innerHTML = '';

    // Código onde cria cada card para cada personagem com atributos (nome, imagem, status...)
    characters.forEach((personagem) => {
        const divCard = document.createElement("div")
        divCard.classList.add("card")

        divCard.innerHTML = `<header class="cards">
                                <h2 class="card-name">${personagem.name}</h2>
                                <span class="heart">♡</span>
                            </header>

                            <div class="card-image">
                                <img class="card-image" src="${personagem.image}" alt="imagem">
                            </div>

                            <div class="card-content">
                                <div class="card-text">
                                    <p class="card-status-text"><strong><span class="cor-subtitulo">Status: </span></strong>${personagem.status}</p>
                                    <p class="card-species-text"><strong><span class="cor-subtitulo">Espécie: </span></strong>${personagem.species}</p>
                                    <p class="card-origin-text"><strong><span class="cor-subtitulo">Origem: </span></strong>${personagem.origin.name}</p>
                                </div>
                            </div>`;

        divCards.appendChild(divCard);
    });
}

// Retorna todos os cards quando a pagina carrega
const getCards = async () => {
    try {
        const endPoint = `https://rickandmortyapi.com/api/character`

        // GET
        const response = await fetch(endPoint)

        const data = await response.json()

        allPersonagens = data.results;

        displayCards(allPersonagens);

    } catch (error) {
        console.error("Erro ao buscar personagens:", error); 
    }
}

 // Retorna o card conforme o que foi digitado
const filterInput = document.getElementById('filter');
filterInput.addEventListener('input', () => {
    const searchTerm = filterInput.value.toLowerCase();


    const filtered = allPersonagens.filter((char) =>
        char.name.toLowerCase().includes(searchTerm)
    );

    displayCards(filtered);
});


getCards();
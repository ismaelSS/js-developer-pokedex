const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return pokeApi.getPokemonDetailsById(pokemon.number).then((pokemonDetail) => {
        return `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>

                <div class="extra-details">
                    <p>Weight: ${pokemonDetail.weight}kg</p>
                    <p>Height: ${pokemonDetail.height}m</p>
                    <p>Abilities: ${pokemonDetail.abilities.join(', ')}</p>
                </div>
            </li>
        `
    })
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const pokemonPromises = pokemons.map(convertPokemonToLi)
        Promise.all(pokemonPromises).then((newHtml) => {
            pokemonList.innerHTML += newHtml.join('')
        })
    })
}
loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})
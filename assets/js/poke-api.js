
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    
    let pokemons = fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)

    console.log(pokemons);
    return pokemons
    
}

pokeApi.getPokemonDetailsById = (number) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${number}/`
    return fetch(url)
        .then(response => response.json())
        .then(pokeDetail => {
            const pokemon = new Pokemon()
            pokemon.number = pokeDetail.id
            pokemon.name = pokeDetail.name
            pokemon.weight = pokeDetail.weight / 10 // Converte para kg
            pokemon.height = pokeDetail.height / 10 // Converte para metros
            pokemon.abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name)
            return pokemon
        })
}

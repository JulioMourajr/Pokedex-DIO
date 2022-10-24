const pokemonList = document.getElementById('pokemonList')

const botao = document.getElementById('botao')
const maxRecords = 151
const limit = 10
let offset = 0

function convertPokemonToHtml(pokemon) {
  return `
    <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
        
        <div class="detail">

          <ol class="types">
            ${pokemon.types
              .map(type => `<li class="type ${type}">${type}</li>`)
              .join('')}
          </ol>
          
            <img
              src="${pokemon.photo}"
              alt="${pokemon.name}"
           />
        </div>
    </li>
  `
}

function maisPokemons(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const novaLista = pokemons.map(pokemon => {
      return convertPokemonToHtml(pokemon)
    })

    const novoHTML = novaLista.join('')
    pokemonList.innerHTML += novoHTML
  })
}

maisPokemons(offset, limit)

botao.addEventListener('click', () => {
  offset += limit
  const qtdRecordsWithNexPage = offset + limit

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset
    maisPokemons(offset, newLimit)

    botao.parentElement.removeChild(botao)
  } else {
    maisPokemons(offset, limit)
  }
})

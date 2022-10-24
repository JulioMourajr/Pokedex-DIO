img{
max-width: 100%; - para que a imagem nunca vazem
}

align-self: flex-end; - para a imagem ficar na direita do conteiner.

# Introdução a API

- servindo dados.
  get e 200 é o sucesso.

requisição

path: url é o ip e porta do servidor
mais o endereço do recurso. ip e path

request method = get, post, delete, patch.
post - vai inserir um novo pokemon. uma postagem
put - atualizar

Path Params e Query String

Path Params - é dinamico é o id
https://pokeapi.co/api/v2/pokemon/{id or name}

Query String
buscar alguma coisa.
um filtro.
após ? - com chave e valor
type=grass&name=i
https://pokeapi.co/api/v2/pokemon/?type=grass&name=i
https://pokeapi.co/api/v2/pokemon?offset=1&limit=20

headers - configuração da nossa requisição.
response headers - configuração da resposta - servidor

request headers - configuração, autenticação são passadas no header.
quais linguas aceitas.
response headers

body é o dado que eu quero trafegar na requisição.
o get não tem body na requisição.

exemplo de post

request headers
content-type: application/json

request body{
"name": "teste"
}

o que vai no body é de acordo com o content type.
o body tanto faz ter na reposta ou na requisição.

resposta do servidor

status code - 200 a 299 - sucesso.

response headers

response body

## requisição http - mandei para o servidor

url

request method

request headers - configuração

request body

## fazer uma requisição http via js

fetch api

fetch api get json
fetch(url) - retorna uma promise.
processamento assincrono, não tem a resposta imediato, a promess é uma promessa de resultado, de um response.

caso de algum erro tem o catch
por padrão o fetch usa o get.
result é a lista do pokemons mesmo.
vai ter que converter o readableStream que veio na requisição para json
response.json

.then(function (response) {
response.json().then(function (responseBody) {
console.log(responseBody)
})
})

isso ai ja vai da acesso ao body convertido para json

fetch(url)
.then(function (response) {
return response.json() - retornando o json transformado.
})

.then(function (jsonBody) {
console.log(jsonBody) - retorna o body e imprimo no console.
})

.catch(function (erro) {
console.erro(erro)
})
.finally(function () {
console.log('Requisição concluida!')
})

fetch(url)
.then(response => {
return response.json()
})

.then(jsonBody => jsonBody.results) - vai retornar um array com os results

faço uma função para colocar o html do li dentro.

.then(pokemonsList => {
for (let i = 0; i < pokemonsList.length; i++) {
const pokemon = pokemonsList[i]
console.log(convertPokemonToHtml(pokemon))
}
})
com isso eu coloco eu pego os dados dinamicamente nesse html

pegamos a nossa lista em html, fizemos a requisição em http para buscar os pokemons, com resultado disso, converto de pokemon para li, para cada pokemon cocatendo com o resultado da pokemonlist que é o nosso html vindo do dom.

const listItems = []
for (let i = 0; i < pokemons.length; i++) {
const pokemon = pokemons[i]
listItems.push(convertPokemonToHtml(pokemon))
}
console.log(listItems)
})

convertendo uma lista de 10 pokemons de objetos para listaHTML.
o map com um array é extamente essa transformação.
const novaLista = pokemons.map(pokemon => {
return convertPokemonToHtml(pokemon)
}) - fez o que o for fez.

const novoHTML = novaLista.join('')
pokemonList.innerHTML += novoHTML

isso tudo posso fazer assim pokeApi.getPokemons().then(pokemons = [])=>{
pokemons.List.innerHTML += pokemons.map(convergtePokemonToHtml).join('')
})

pega os pokemons, mapeia os pokemons, para uma lista de html, agora junta esses html(li) sem separador.
isso tudo concatenando com o html antigo que eu tinha.

Promise.all(recebe um array de promisses.)

vamos fazer a requisição que vai trazer a lista de pokemons e vamos transformar a lista de pokemons e novas requisições, esperar que essa nova lista responda e vamos utilizar o resultado delas.

return fetch(url)
.then(response => response.json())
.then(jsonBody => jsonBody.results)
.then(pokemons =>pokemons.map((pokemon)=> fetch(pokemon.url)) - transformando uma nova lista em uma lista que é a lista de promessas do detalhe do pokemon, essa promessa vai vim uma response, tem que tratar ela para vim uma lista de json.

return fetch(url) - pegando a lista de pokemons
.then(response => response.json()) - converto para json
.then(jsonBody => jsonBody.results) - o que interessa é os resultados que é a nossa lista de verdade.
.then(pokemons => pokemons.map(pokeApi.getPokemonDetail)) - estamos mapiando essa lista em uma lista de requisições do detalhe dos pokemons que é um novo fetch para url do pokemon que eu to querendo acessar e convertendo a response que ele me de para um json.
.then(detailRequests => Promise.all(detailRequests)) - estamos esperando que todas as requisições termine, quando terminar.
.then(pokemonsDetails => { - ele vai da uma lista de detalhe dos pokemons.
console.log('foi')
console.log(pokemonsDetails)
})

function convertPokeApiDetailToPokemon(pokeDetail) { - convertir um modelo do poke api para o nosso modelo.
const pokemon = new Pokemon()
pokemon.number = pokeDetail.order
pokemon.name = pokeDetail.name

const types = pokeDetail.types.map(type$lot => type$lot.type.name)
const type = types
pokemon.types = types
pokemon.type = type
pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

return pokemon
}

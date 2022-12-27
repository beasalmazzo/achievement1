
let pokemonRepository = (function() {

    let pokemonList = [
        { name: 'Charmander', height: 0.6, type: ['fire']},
        { name: 'Bulbasaur', height: 0.7, type: ['grass', 'poison']},
        { name: 'Squirtle', height: 0.5, type: ['water']}
    ];

    let add = function(pokemon){
        
        if(typeof pokemon === 'object' && 
            pokemon !== null &&
            Object.keys(pokemon).includes("name") &&
            Object.keys(pokemon).includes("type") &&
            Object.keys(pokemon).includes("height")) 
            {
                pokemonList.push(pokemon);               
            }
    }

    let getAll = function(){
        return pokemonList; 
    }

    return {
        add: add,
        getAll: getAll
    };
})();

console.log(pokemonRepository.getAll());  //why doesn't it work with document.write instead of console.log? it prints [object Object],[object Object],[object Object]

//pokemonRepository.add({name:'pikachu', type:2, height: 1});
//console.log(pokemonRepository.getAll());

//write on the screen a list of pokemons and their heights
function printPokemonList(pokemon){
    document.write('<p>'+pokemon.name + ' (height: ' + pokemon.height +', type: ' + pokemon.type + ')'+'</p>');
  }
pokemonRepository.getAll().forEach(printPokemonList);


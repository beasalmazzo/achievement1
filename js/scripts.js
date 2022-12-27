
/*on Exercise 2 the declaration of the variable was incorrect, so I fixed it now.
Before:
pokemonList = []; 

let pokemonList = [  ------------ 'let' in the incorrect line

*/
let pokemonList = [];

pokemonList = [
    { name: 'Charmander', height: 0.6, type: ['fire']},
    { name: 'Bulbasaur', height: 0.7, type: ['grass', 'poison']},
    { name: 'Squirtle', height: 0.5, type: ['water']}
];

//write on the screen a list of pokemons and their heights. Wrote the function with "item" to make it reusable for other types of lists
  function printList(item){
    document.write('<p>'+item.name + ' (height: ' + item.height +', type: ' + item.type + ')'+'</p>');
  }
  pokemonList.forEach(printList);



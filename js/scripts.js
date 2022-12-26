
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

//write on the screen a list of pokemons and their heights
for (i=0 ; i<pokemonList.length ; i++){
    if (pokemonList[i].height > 0.6) {
        document.write(`${pokemonList[i].name} (height: ${pokemonList[i].height}) - Wow, that's big!\n`);
        // why is \n acting like a space instead of an enter?
    }   
    else {
        document.write(`${pokemonList[i].name} (height: ${pokemonList[i].height})\n`);
    }
}
    
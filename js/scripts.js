
let pokemonRepository = (function() {

    //creates a button for each pokemon in the list of pokemons
    //only ul is in the html, the rest is here
    let addListItem = function (pokemon){
        let newList = document.querySelector('ul'); 
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('pokemon-button'); //to be able to style it
        listItem.appendChild(button);
        newList.appendChild(listItem);

       //triggers the event listener on the button
        buttonEventListener (button, pokemon);
    }

    //when button is clicked, the details of the pokemon are shown (calls the function)
    function buttonEventListener (button, pokemon){
        button.addEventListener('click', function () {      //why doesn't it work it I pass "pokemon" as the argument of the function?
            showDetails(pokemon);
        });
}
    //to show details of a pokemon
    function showDetails(pokemon){
        console.log(pokemon);
    }

    let pokemonList = [
        { name: 'Charmander', height: 0.6, type: ['fire']},
        { name: 'Bulbasaur', height: 0.7, type: ['grass', 'poison']},
        { name: 'Squirtle', height: 0.5, type: ['water']}
    ];

    //check if the new pokemon's details are an object and include all necessary keys
    //then add it to the list
    function add(pokemon){
        
        if(typeof pokemon === 'object' && 
            pokemon !== null &&
            Object.keys(pokemon).includes("name") &&
            Object.keys(pokemon).includes("type") &&
            Object.keys(pokemon).includes("height")) {
                pokemonList.push(pokemon);               
        }
        else {
            console.log("pokemon is not correct");
        }
    }

    function getAll(){
        return pokemonList; 
    }

    //access to the local variables from outside 
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem
    };
})();

//console.log(pokemonRepository.getAll());  

//triggers the function that creates the pokemons buttons 
function printPokemonList(pokemon){
   
    pokemonRepository.addListItem(pokemon);

}
pokemonRepository.getAll().forEach(printPokemonList);


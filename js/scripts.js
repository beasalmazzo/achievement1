

let pokemonRepository = (function() {

    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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
        button.addEventListener('click', function () {    
            showDetails(pokemon);
        });
    }

    //to show details of a pokemon
    function showDetails(pokemon) {
          
        loadDetails(pokemon).then(function () {
            
            //modal goes here
            //////////////////////////////


               

                (function() {

                    let modalContainer = document.querySelector('#modal-container');
                    console.log('test1');
                    modalContainer.classList.add('is-visible');


                    console.log(pokemon);

                })();



            //////////////////////////////

        });
    }

    //check if the new pokemon's details are an object and include all necessary keys
    //then add it to the list
    function add(pokemon){
        
        if(typeof pokemon === 'object' && 
            pokemon !== null &&
            Object.keys(pokemon).includes("name") &&
            Object.keys(pokemon).includes("detailsUrl")) {
                pokemonList.push(pokemon);               
        }
        else {
            console.log("pokemon is not correct");
        }
    }

    function getAll(){
        return pokemonList; 
    }

    //fetches the pokemons data from the api adds it to the pokemon list
    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
      }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            // Now we add the details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }    

    //access to the local variables from outside 
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails
    };
})();

pokemonRepository.loadList().then(function() {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
    });
});

//console.log(pokemonRepository.getAll());  

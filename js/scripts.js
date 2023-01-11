let pokemonRepository = (function() {

    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    //creates a button for each pokemon in the list of pokemons
    //only ul is in the html, the rest is here
    let addListItem = async function (pokemon){
        let newList = document.querySelector('ul'); 
        let listItem = document.createElement('li');
        let button = $('<button type="button" class="btn btn-primary pokemon-button" data-toggle="modal" data-target="#pokemon-modal">' + pokemon.name + '</button>');

        listItem.appendChild(button);
        newList.appendChild(listItem);

        //add image to the button (name was added on <button>)
        const pokemonDetail = await loadDetails(pokemon);
        let buttonImage = document.createElement('img');
        buttonImage.setAttribute('id', 'pokemon-picture'); //same as picture in the modal
        button.appendChild(buttonImage);
        buttonImage.setAttribute('src', pokemon.imageUrl);
        buttonImage.setAttribute('alt', 'picture of the pokemon');
    
       //triggers the event listener on the button
        button.on('click', function() {
            showDetails(pokemon);
        }); 
    }

    //to show details of a pokemon
    function showDetails(pokemon) {
          
        loadDetails(pokemon).then(function () {
            
            //modal goes here
            //////////////////////////////

            (function() {
               
                let modalTitle = $('.modal-title');
                let modalBody = $('.modal-body');

                ///insert pokemon name
                modalTitle.text(pokemon.name);
                modalTitle.setAttribute('id', 'title'); //not necessary because of above line. Unless I want to use the id for styling
                
                ///add pokemon image to modal
                let pokemonImage = $('<img class="pokemon picture" src="'+ pokemon.imageUrl +'" alt="picture of the selected pokemon"/>');
                let pokemonDetails = $('<p>Height: '+ pokemon.height/10 + ' m\nTypes: '+ newTypes(pokemon) +'</p>');
                ///insert pokemon details
          
                modalBody.append(pokemonImage);
                modalBody.append(pokemonDetails);


                ///return types of pokemons (because pokemon.types is an object)
                function newTypes (pokemon){

                    let type1 = pokemon.types[0].type;

                    if (pokemon.types.length > 1){
                        let type2 = pokemon.types[1].type;
                        return `${type1.name} / ${type2.name}`;
                    }
                    else{
                        return type1.name;
                    }
                }

            })();

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

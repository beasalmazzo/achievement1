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

                    //pops up the modal by adding class is-visible
                    let modalContainer = document.querySelector('#modal-container');
                    modalContainer.innerHTML = '';
                    modalContainer.classList.add('is-visible');

                    //create modal div
                    let modal = document.createElement('div');
                    modal.setAttribute('id', 'modal');
                    modalContainer.appendChild(modal);
                    
                    //create structuce inside modal
                    //insert pokemon name
                    let titleElement = document.createElement('h1');
                    titleElement.setAttribute('id', 'title'); //not necessary because of above line. Unless I want to use the id for styling
                    modal.appendChild(titleElement);
                    titleElement.innerText = pokemon.name;
                    //create image container
                    let imageContainer = document.createElement('div');
                    imageContainer.setAttribute('id', 'image-container');
                    modal.appendChild(imageContainer);
                    //add pokemon image to modal
                    let imageElement = document.createElement('img');
                    imageElement.setAttribute('id', 'pokemon-picture');
                    imageContainer.appendChild(imageElement);
                    imageElement.setAttribute('src', pokemon.imageUrl);
                    imageElement.setAttribute('alt', 'picture of the selected pokemon');
                    //insert pokemon details
                    let contentElement = document.createElement('p');
                    contentElement.setAttribute('id', 'pokemon-details');
                    modal.appendChild(contentElement);
                    contentElement.innerText = 'Height: ' + pokemon.height +  '\nTypes: ' + newTypes(pokemon);

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
                    newTypes (pokemon);

                    /*document.createElement('button');
                    let closeButtonElement = document.querySelector('button');
                    closeButtonElement.classList.add('close-button');*/
                    
                    

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

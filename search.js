async function loadPokemonNamesforSearch() {
let count = 1000; 
  url = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${count}`;
  response = await fetch(url);
  allPokemonNames = await response.json();
}


function searchPokemon() {
  let inputSearch = document.getElementById("search").value;

if(loadingIsComplete == true){
    if (document.getElementById("search").value.length == 0) {
      loadingIsComplete = false;
      filteredResultId = [];
      mainView().then(() => {
        loadingIsComplete = true;
      });
    } else if (document.getElementById("search").value.length >= 3) {
      loadingIsComplete = false;
      createPokemonList();
      showFoundedPokemon(inputSearch);
        loadingIsComplete = true;
    }
  }
}





function timer(){
  loadingIsComplete = true;
}


function createPokemonList() {
  pokemonList = [];
  for (let i = 0; i < allPokemonNames["results"].length; ++i) {
    pokemonList.push(allPokemonNames["results"][i]["name"]);
  }
}


function showFoundedPokemon(inputSearch) {
  filteredResultId = [];
  let singleResult = 1;
  filteredResult = pokemonList.filter((el) =>
    el.toLowerCase().startsWith(inputSearch.toLowerCase())
  );
     filteredResultId.push(singleResult);

  for (let i = 0; i < filteredResult.length; i++) {
    singleResult = pokemonList.indexOf(filteredResult[i]);
    singleResult = singleResult + 1;
    filteredResultId.push(singleResult);
  }
  renderSearchView();
}

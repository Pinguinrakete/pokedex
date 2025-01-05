async function init() {
  await mainView();
  loadPokemonNamesforSearch();
}


async function mainView() {
  let currentPokemon;
  let content = document.getElementById("card");
  content.innerHTML = '';
  
  for (let i = 1; i < numberOfLoadedPokemon; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
    let response = await fetch(url);
    currentPokemon = await response.json();

    loadPokemon(i, currentPokemon);
    loadPokemonTypes(i, currentPokemon);
  }
}


async function renderSearchView() {
  let filteredPokemon;
  let content = document.getElementById("card");
  content.innerHTML = '';

  for (let i = 1; i < filteredResultId.length; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${filteredResultId[i]}/`;
    let response = await fetch(url);
    filteredPokemon = await response.json();

    loadPokemon(i, filteredPokemon);
    loadPokemonTypes(i, filteredPokemon);
  }
}


function loadPokemon(i, currentPokemon) {
  let content = document.getElementById('card');

  content.innerHTML += `
    <div class="card" onclick="openPokemonCard(${i})">
      <div class="card-inside">
        <div class="containerpokemonimage d_flex_fe_c" id="pokemonimage${i}">
        <img class="pokemonimage" src="${currentPokemon["sprites"]["other"]["home"]["front_shiny"]}"></div>   
        <div class="d_flex_c_c containerpokemonname"><h2>${currentPokemon["name"]}</h2></div>
        <div class="d_flexdirection_r_sa containerpokemontypes">
          <div id="type0${i}"></div>
          <div id="type1${i}"></div>
        </div>
    <div class="d_flex_c_c containerpokemonid"><p>ID: #${currentPokemon["id"]}</p></div> 
    </div>  
    </div>
    `;
}


function loadPokemonTypes(i, currentPokemon) {
  for (let j = 0; j < currentPokemon["types"].length; j++) {
    if (currentPokemon["types"][j] != undefined) {
      document.getElementById(`type${j}${i}`).innerHTML = 
      `<div class="containerpokemontype"><h3>${currentPokemon["types"][j]["type"]["name"]}</h3></div>`;
      changeTypeBackground(i, j, currentPokemon);
    }
  }
  sortType1Type2ForBackgroundColor(i, currentPokemon);
}


function sortType1Type2ForBackgroundColor(i, currentPokemon) {
  let typeNullColor = currentPokemon["types"][0]["type"]["name"];
  let typeOneColor;
  if (currentPokemon["types"][1] == undefined) {
    typeOneColor = currentPokemon["types"][0]["type"]["name"];
  } else {
    typeOneColor = currentPokemon["types"][1]["type"]["name"];
  }
  changeBackgroundPokemonImage(i, typeNullColor, typeOneColor);
}  


function changeBackgroundPokemonImage(indexPokemon, color1, color2) {
  let colorLeft = typeColor[color1];
  let colorRight = typeColor[color2];

  document.getElementById(`pokemonimage${indexPokemon}`).style.backgroundImage = 
  `linear-gradient(135deg, ${colorLeft} 50%, ${colorRight} 50%)`;
}


function changeTypeBackground(i, j, currentPokemon) {
  let type = currentPokemon["types"][j]["type"]["name"];
  document.getElementById(`type${j}${i}`).style.backgroundColor = typeColor[type];
  document.getElementById(`type${j}${i}`).style.borderRadius = '5px';
}


function loadCard() {
  numberOfLoadedPokemon = numberOfLoadedPokemon + 24;
  document.getElementById("card").innerHTML = '';
  mainView();
}


function pageUp() {
  document.documentElement.scrollTop = 0;
}


function openPokemonCard(selectedPokemon){
  document.getElementById('dark-bg').classList.remove('d-none');
  document.body.style.overflowY = 'hidden';
  renderPokemonCard(selectedPokemon);
}


function closePokemonCard(){
  document.getElementById('dark-bg').classList.add('d-none');
  document.body.style.overflowY = 'visible';
}


function loadPokemonCardTypes(selectedPokemon, pokemon) {
   for (let j = 0; j < pokemon["types"].length; j++) {
     if (pokemon["types"][j] != undefined) {
      document.getElementById(`pokemoncardtype${j}${selectedPokemon}`).innerHTML = 
      `<div class="pokemoncardtype"><h3>${pokemon["types"][j]["type"]["name"]}</h3></div>`;
      changePokemonCardTypeBackground(selectedPokemon, j, pokemon);
      changeBackgroundPokemonCard(selectedPokemon);
     }
   }
}


function changePokemonCardTypeBackground(selectedPokemon, j, pokemon) {
  let type = pokemon["types"][j]["type"]["name"];
  document.getElementById(`pokemoncardtype${j}${selectedPokemon}`).style.backgroundColor =
    typeColor[type];
}


function changeBackgroundPokemonCard(selectedPokemon) {
  let colorLeft = typeColor[pokemon["types"][0]["type"]["name"]];
  let colorRight;

if(pokemon["types"][1] == undefined){
  colorRight = typeColor[pokemon["types"][0]["type"]["name"]];
 } else {
  colorRight = typeColor[pokemon["types"][1]["type"]["name"]];
 }

 document.getElementById(`pokemoncardimage${selectedPokemon}`).style.backgroundImage = 
 `linear-gradient(135deg, ${colorLeft} 50%, ${colorRight} 50%)`;
}


async function renderPokemonCard(selectedPokemon){
if(typeof filteredResultId[0] == 'undefined'){
  let url = `https://pokeapi.co/api/v2/pokemon/${selectedPokemon}/`;
  let response = await fetch(url);
  pokemon = await response.json();
} else {
  let url = `https://pokeapi.co/api/v2/pokemon/${filteredResultId[selectedPokemon]}/`;
  let response = await fetch(url);
  pokemon = await response.json();
}

  let content = document.getElementById('pokemoncard');
  content.innerHTML = '';
  renderContentPokemonCard(selectedPokemon, pokemon, content);
  loadPokemonCardTypes(selectedPokemon, pokemon);
  loadSkills(selectedPokemon);
}


function renderContentPokemonCard(selectedPokemon, pokemon, content){
  content.innerHTML = `
  <div class="viewpokemoncard">
    <div class="head-pokemoncard d_flex_c" id="pokemoncardimage${selectedPokemon}">
      <div class="d_flexdirection_c pokemoncardimagecenter">
        <div class="pokemoncardid"><p>ID: #${pokemon["id"]}</p></div>
        <img class="pokemoncardimage" src="${pokemon["sprites"]["other"]["home"]["front_shiny"]}">
      </div>
    </div>
    <div class="info-pokemoncard d_flexdirection_c_c">
      <div class="d_flexdirection_r_sb" id="bar" onclick="event.stopPropagation();">
        <div><img class="arrow-icon" onclick="lastPokemonCard(${selectedPokemon})" src="./img/arrow-left-icon.png"></div>
        <div class="d_flex_c_c info-pokemonname"><h5>${pokemon["name"]}</h5></div>
      <div><img class="arrow-icon" onclick="nextPokemonCard(${selectedPokemon})" src="./img/arrow-right-icon.png"></div>
    </div>
    <div class="d_flex_c_c">
      <div class="d_flexdirection_r_c pokemoncardtypes">
        <div id="pokemoncardtype0${selectedPokemon}"></div>
        <div id="pokemoncardtype1${selectedPokemon}"></div>
      </div>
    </div>
    <div class="size-skillchartpokemoncard">
      <canvas id="pokemonskills"></canvas>
    </div>
  </div>
  `;
}


function lastPokemonCard(selectedPokemon){
  selectedPokemon--;

if(typeof filteredResultId[0] == 'undefined'){
  if(selectedPokemon == 0){
    selectedPokemon = 1000;
    renderPokemonCard(selectedPokemon);
  } else {
    renderPokemonCard(selectedPokemon);
  }
} else {
  let a = filteredResultId.length - 1;
  if(selectedPokemon == 0){
    selectedPokemon = a;
    renderPokemonCard(selectedPokemon);
  } else {
    renderPokemonCard(selectedPokemon);
    }
  }
}


function nextPokemonCard(selectedPokemon){
  selectedPokemon++;

if(typeof filteredResultId[0] == 'undefined'){
  if(selectedPokemon == 1001){
      selectedPokemon = 1;
      renderPokemonCard(selectedPokemon);
    } else {
    renderPokemonCard(selectedPokemon);
    }
  } else {
    if(selectedPokemon == filteredResultId.length){
      selectedPokemon = 1;
      renderPokemonCard(selectedPokemon);
    } else {
      renderPokemonCard(selectedPokemon);
      }
    }
  }
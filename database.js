let numberOfLoadedPokemon = 25;
let allPokemonNames;
let pokemonList = [];
let filteredResult;
let filteredResultId = [];
let loadingIsComplete = true;
let myChart = null;
let labels = ['Hp', 'Attack', 'Defense', 'Sp-Attack', 'Sp-Defense', 'Speed'];
let stats = [];
let typeColor = 
    {
        fire: "#FBB741",
        grass: "#9ECB91",
        water: "#96D8DE",
        bug: "#CC3333",
        flying: "#00AFF0",
        poison: "#E5B80B",
        normal: "#ffdab9",
        electric: "#F1D651",
        ground: "#8b5742",
        psychic: "#ff34b3",
        fairy: "#F2C1D1",
        fighting: "#b93636",
        rock: "#817669",
        steel: "#B5C0C9",
        ice: "#53CCDC",
        dragon: "#79B465",
        dark: "#4E4459",
        ghost: "#C2C1D4"
};
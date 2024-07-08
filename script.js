const formSearch = document.getElementById("search-form")
const inputSearch = document.getElementById("search-input");
const h1PokemonName = document.getElementById("pokemon-name")
const spanPokemonId = document.getElementById("pokemon-id")
const spanWeight = document.getElementById("weight")
const spanHeight = document.getElementById("height")
const divTypes = document.getElementById("types")
const spanHp = document.getElementById("hp")
const spanAttack = document.getElementById("attack")
const spanDefense = document.getElementById("defense")
const spanSpecialAttack = document.getElementById("special-attack")
const spanSpecialDeffense = document.getElementById("special-defense")
const spanSpeed = document.getAnimations("speed")
const statsSpans = document.querySelectorAll("table span")
const divImage = document.getElementById("image-container")

formSearch.addEventListener("submit", (e) => {
    //console.log(inputSearch.value)
    e.preventDefault()
    fetchData(inputSearch.value.toLowerCase().replaceAll(/ /g, "-"))
})

const fetchData = async (idOrName) => {
    try {
        const res = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${idOrName}`);
        const data = await res.json();
        //console.log(data)
        displayPokemon(data)

    } catch (err) {
        alert("Pokémon not found")
    }
}

const displayPokemon = (pokemonData) => {
    const {name, id, weight, height, types, stats, sprites} = pokemonData
    //console.log(name, id, weight, height, types, stats)

    h1PokemonName.textContent = name.toUpperCase()
    spanPokemonId.textContent = `#${id}`
    spanWeight.textContent = `Weight: ${weight/10}kg`
    spanHeight.textContent = `Height: ${height/10}m`
    divTypes.innerHTML = ""
    types.forEach(slot => {
        const {type} = slot
        let typeColor ="";
        console.log(type.name)

        typeColor = returnClassForColor(type.name)

        divTypes.innerHTML += `
            <span class="${typeColor}">${type.name.toUpperCase()}</span>
        ` 
    });
    divImage.innerHTML = `
        <img id="sprite" src="${sprites.front_default}" alt="${name} image"/>
    `

    for(let i=0; i < statsSpans.length; i++) {
        statsSpans[i].textContent = stats[i].base_stat
    }


}

const returnClassForColor = (nameType) => {
    switch(nameType) {
        case "grass":
            return "grass"
        case "poison": 
            return "poison"
        case "fire":
            return "fire"
        case "water":
            return "water"
        case "normal":
            return "normal"
        case "ground":
            return "ground"
        case "rock":
            return "rock"
        case "flying":
            return "flying"
        case "electric":
            return "electric"
        case "dragon":
            return "dragon"
        case "fighting":
            return "fighting"
        case "psychic":
            return "psychic"
        case "ghost":
            return "ghost"
        case "fairy":
            return "fairy"
        case "bug":
            return "bug"
        case "steel":
            return "steel"
        case "dark":
            return "dark"
    }
}

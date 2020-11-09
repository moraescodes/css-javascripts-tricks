const loading = document.querySelector('.loading');
const display = document.querySelector('.display');
let pokemonId = 1;

getPokemons();

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if(scrollTop + clientHeight >= scrollHeight){
    console.log('to the bottom');
    setLoading();
    getPokemons();
  }
});

function setLoading(){
  loading.classList.toggle('active');
}

function setVanillaTilt(){
  VanillaTilt.init(document.querySelectorAll(".card"), {
    max: 25,
    scale: 1.1,
    transition: true,
    speed: 200
  });
}

async function getPokemons(){


  if(pokemonId > 10){
    setLoading();
    return;
  }

  console.log('foi 1');
  for(var count = 1; count <= 12; count++){
    const res = await (await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)).json();
    pokemonId = pokemonId + 1;

    const pokemon = document.createElement('div');
    pokemon.classList.add('card');

    pokemon.innerHTML = `
      <h2>${res.name}</h2>
      <div class="circle"></div>
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png" />
      <div class="info">${res.types.map((type)=> type.type.name)}</div>  
    `;

    display.appendChild(pokemon);

    setVanillaTilt();
  }
 

  setLoading();
}
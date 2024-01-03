const pokemonNameElement = document.querySelector('.pokemon_name');
const pokemonNumberElement = document.querySelector('.pokemon_number');
const pokemonImageElement = document.querySelector('.pokemon_image');

const formElement = document.querySelector('.form');
const inputElement = document.querySelector('.input_search');
const buttonPrevElement = document.querySelector('.btn-prev');
const buttonNextElement = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Erro ao obter dados do Pokémon');
    }
  } catch (error) {
    console.error('Erro na requisição da API:', error);
    throw error;
  }
};

const renderPokemon = async (pokemon) => {
  try {
    pokemonNameElement.innerHTML = 'Carregando...';
    pokemonNumberElement.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data) {
      pokemonImageElement.style.display = 'block';
      pokemonNameElement.innerHTML = data.name;
      pokemonNumberElement.innerHTML = data.id;
      pokemonImageElement.src = data.sprites.versions['generation-v']['black-white'].animated.front_default;
      inputElement.value = '';
      searchPokemon = data.id;
    } else {
      pokemonImageElement.style.display = 'none';
      pokemonNameElement.innerHTML = 'Não encontrado';
      pokemonNumberElement.innerHTML = '';
    }
  } catch (error) {
    console.error('Erro ao renderizar o Pokémon:', error);
  }
};

const handleFormSubmit = async (event) => {
  event.preventDefault();
  const pokemonName = inputElement.value.toLowerCase();
  await renderPokemon(pokemonName);
};

formElement.addEventListener('submit', handleFormSubmit);

buttonPrevElement.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNextElement.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);


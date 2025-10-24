// mostrar151.js
export async function mostrar151() {
  const container = document.getElementById("pokemon-container");

  try {
    // 1️⃣ Obtener lista de los primeros 151 Pokémon
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
    const data = await response.json();

    // recopilar cada Pokémon y crear su card
    for (let i = 0; i < data.results.length; i++) {
      const pokemon = data.results[i];
      const pokemonData = await fetch(pokemon.url);
      const details = await pokemonData.json();

      // contenedor
      container.innerHTML += `
        <div class="bg-white rounded-xl shadow-lg p-4 w-56 hover:scale-105 transition-transform text-center ">
          <img 
            src="${details.sprites.other['official-artwork'].front_default}" 
            alt="${details.name}" 
            class="mx-auto mb-3 w-32 h-32 object-contain"
          />
          <h2 class="text-lg font-semibold capitalize">${i + 1}. ${details.name}</h2>
        </div>
      `;
    }

  } catch (error) {
    console.error("Error al obtener los Pokémon:", error);
    container.innerHTML = `<p class="text-red-500 text-center">Error cargando los Pokémon.</p>`;
  }
}





import { filtrarPokemons } from "./david.js";

// mostrar151.js
/* export async function mostrar151() {
  const container = document.getElementById("pokemon-container");
  let convertHeight = (decimeters) => (decimeters / 10).toFixed(1);
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
          <p class="text-gray-600">Altura: ${convertHeight(details.height)} m</p>
        </div>
      `;
    }
    filtrarPokemons(details,mostrar151);

  } catch (error) {
    console.error("Error al obtener los Pokémon:", error);
    container.innerHTML = `<p class="text-red-500 text-center">Error cargando los Pokémon.</p>`;
  }
}
 */


import { filtroAltura } from "./david.js";

export let allPokemons = [];
let convertHeight = (decimeters) => (decimeters / 10).toFixed(1);

const contenedor = document.getElementById("pokemon-container");

// ✅ Cargar Pokémon
export async function cargarPokemons(limit = 151) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
    const data = await res.json();

    const detalles = await Promise.all(
      data.results.map(async (p) => {
        const resDetalle = await fetch(p.url);
        const pokemon = await resDetalle.json();
        return {
          id: pokemon.id,
          nombre: pokemon.name,
          imagen: pokemon.sprites.other["official-artwork"].front_default,
          tipos: pokemon.types.map((t) => t.type.name),
          height: pokemon.height,
        };
      })
    );

    allPokemons = detalles;
    mostrarPokemons(allPokemons);

    // Activar filtro por altura después de cargar
    filtroAltura(allPokemons, mostrarPokemons);
  } catch (error) {
    console.error("Error al cargar Pokémon:", error);
  }
}

// ✅ Mostrar Pokémon
export function mostrarPokemons(lista) {
  contenedor.innerHTML = "";

  if (lista.length === 0) {
    contenedor.innerHTML = `
      <p class="col-span-full text-center text-gray-500">
        No se encontraron resultados 😔
      </p>`;
    return;
  }

  lista.forEach((p) => {
    const card = document.createElement("div");
    card.className =
      "bg-white rounded-xl shadow-lg p-4 w-56 hover:scale-105 transition-transform text-center";
    card.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}" class="w-24 h-24 mx-auto mb-3">
      <h2 class="capitalize font-bold text-lg">${p.nombre}</h2>
      <p class="text-sm text-gray-500">${p.tipos.join(", ")}</p>
      <p class="text-gray-600">Altura: ${convertHeight(p.height)} m</p>
    `;
    contenedor.appendChild(card);
  });
}



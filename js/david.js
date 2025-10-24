import { filtroAltura } from "./jorge.js";

fetch("https://pokeapi.co/api/v2/pokemon/ditto")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Error:", error));
// Referencias del DOM
const contenedor = document.getElementById("conteinerCards");
const searchInput = document.getElementById("searchPokemon");
const typeFilter = document.getElementById("filterType");

let allPokemons = [];
let convertHeight = (decimeters) => (decimeters / 10).toFixed(1);

// ✅ 1. Cargar los primeros 100 Pokémon desde la PokéAPI
async function cargarPokemons(limit = 151) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
    const data = await res.json();

    // Obtener detalles de cada Pokémon (en paralelo)
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

    //AGREGANDO MI PARTE PARA FILTRAR POR ALTURA
    filtroAltura(allPokemons,mostrarPokemons);
  } catch (error) {
    console.error("Error al cargar Pokémon:", error);
  }
}

// ✅ 2. Renderizar las tarjetas en pantalla
/* function mostrarPokemons(lista) {
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
} */

// ✅ 3. Filtro combinado (por nombre y tipo)
function filtrarPokemons() {
  const texto = searchInput.value.toLowerCase();
  const tipoSeleccionado = typeFilter.value;

  const filtrados = allPokemons.filter((p) => {
    const coincideNombre = p.nombre.toLowerCase().includes(texto);
    const coincideTipo =
      tipoSeleccionado === "" || p.tipos.includes(tipoSeleccionado);
    return coincideNombre && coincideTipo;
  });

  mostrarPokemons(filtrados);
}

// ✅ 4. Eventos para los filtros
searchInput.addEventListener("input", filtrarPokemons);
typeFilter.addEventListener("change", filtrarPokemons);


// ✅ 5. Inicializar
cargarPokemons();

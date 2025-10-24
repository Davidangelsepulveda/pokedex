// main.js
/* import { mostrar151 } from "./mostrar151.js";

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  mostrar151();
});
 */

// main.js
import { cargarPokemons } from "./mostrar151.js";
import { filtrarPokemons } from "./david.js";
import { paginasF } from "./pagina.js";

document.addEventListener("DOMContentLoaded", async () => {
  const pokemons = await cargarPokemons(); // ahora sí devuelve la lista
  paginasF(pokemons, 12);

  // Conectar filtros
  document
    .getElementById("searchPokemon")
    .addEventListener("input", filtrarPokemons);
  document
    .getElementById("filterType")
    .addEventListener("change", filtrarPokemons);
});

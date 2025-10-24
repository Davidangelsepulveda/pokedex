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

// ✅ Iniciar app
cargarPokemons();

// ✅ Conectar los filtros de búsqueda y tipo
document.getElementById("searchPokemon").addEventListener("input", filtrarPokemons);
document.getElementById("filterType").addEventListener("change", filtrarPokemons);
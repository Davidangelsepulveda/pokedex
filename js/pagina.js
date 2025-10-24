import { mostrarPokemons } from "./mostrar151.js";

export function paginasF(lista, itemsPorPagina = 12) {
  let paginaActual = 1;
  const totalPaginas = Math.ceil(lista.length / itemsPorPagina);

  function renderizarPagina() {
    const paginacionDiv = document.getElementById("paginacion");

    const inicio = (paginaActual - 1) * itemsPorPagina;
    const fin = inicio + itemsPorPagina;
    const paginaPokemons = lista.slice(inicio, fin);

    mostrarPokemons(paginaPokemons);

    paginacionDiv.innerHTML = `
      <button ${paginaActual === 1 ? "disabled" : ""} 
        id="anterior" class="px-3 py-1 mx-1 bg-gray-300 rounded">Anterior</button>
      <span class="mx-2">${paginaActual} / ${totalPaginas}</span>
      <button ${paginaActual === totalPaginas ? "disabled" : ""} 
        id="siguiente" class="px-3 py-1 mx-1 bg-gray-300 rounded">Siguiente</button>
    `;

    document.getElementById("anterior").addEventListener("click", () => {
      if (paginaActual > 1) {
        paginaActual--;
        renderizarPagina();
      }
    });

    document.getElementById("siguiente").addEventListener("click", () => {
      if (paginaActual < totalPaginas) {
        paginaActual++;
        renderizarPagina();
      }
    });
  }

  renderizarPagina();
}

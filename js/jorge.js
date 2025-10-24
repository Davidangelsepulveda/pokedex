/* export function filtroAltura(allPokemons, renderPokemons) {
  const btn = document.querySelector("#filtro");

  btn.addEventListener("click", () => {
    let min = parseFloat(document.getElementById("minAltura").value) || 0;
    let max = parseFloat(document.getElementById("maxAltura").value) || Infinity;


    let tipoSeleccionado = document.getElementById("filterType").value;
    // Convertimos de decímetros a metros (PokéAPI devuelve height en decímetros)
    let filtered = allPokemons.filter((p) => {
      let altura = p.height ? p.height / 10 : 0;
      let cumpleAltura = altura >= min && altura <= max;
      let cumpleTipo =
        tipoSeleccionado === "" || p.tipos.includes(tipoSeleccionado);

      return cumpleAltura && cumpleTipo;
      
    });

    renderPokemons(filtered);
  });
}
 */

export function filtroAltura(allPokemons, renderPokemons) {
  const btn = document.querySelector("#filtro");

  btn.addEventListener("click", () => {
    let min = parseFloat(document.getElementById("minAltura").value) || 0;
    let max = parseFloat(document.getElementById("maxAltura").value) || Infinity;

    let tipoSeleccionado = document.getElementById("filterType").value;
    let texto = document.getElementById("searchPokemon").value.toLowerCase();

    const filtrados = allPokemons.filter((p) => {
      let altura = p.height / 10;
      let coincideAltura = altura >= min && altura <= max;
      let coincideTipo =
        tipoSeleccionado === "" || p.tipos.includes(tipoSeleccionado);
      let coincideNombre = p.nombre.toLowerCase().includes(texto);

      return coincideAltura && coincideTipo && coincideNombre;
    });

    renderPokemons(filtrados);
  });
}
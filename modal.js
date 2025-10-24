// Control del Modal Pokémon by Alfredo Mariscal


// Seleccionamos el modal y su contenido
const modal = document.getElementById("modalPokemon");
const modalContent = document.getElementById("modalContent");

// Esta función abre el modal con los datos del Pokémon seleccionado
function abrirModal(pokemon) {
  // Aquí podrías insertar la información dinámica del Pokémon
  // Ejemplo: modalContent.innerHTML = `<h2>${pokemon.name}</h2>`;

  // Mostramos el modal
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

// Esta función cierra el modal
function cerrarModal() {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

// Evento: cerrar modal al hacer clic fuera del contenido
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    cerrarModal();
  }
});

// Evento: cerrar modal con tecla "ESC"
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    cerrarModal();
  }
});


// MODO OSCURO / CLARO


// Estado inicial del tema
let state = {
  tema: localStorage.getItem("tema") || "light",
};

// Seleccionamos el botón de cambio de tema
const btnTema = document.getElementById("btnTema");

// Función para cambiar entre claro y oscuro
function cambiarTema() {
  const body = document.body;

  if (state.tema === "dark") {
    // Cambiar a modo claro
    body.classList.remove("bg-gray-900", "text-white");
    body.classList.add("bg-gray-100", "text-black");
    btnTema.textContent = "🌙 Modo oscuro";
    state.tema = "light";
  } else {
    // Cambiar a modo oscuro
    body.classList.remove("bg-gray-100", "text-black");
    body.classList.add("bg-gray-900", "text-white");
    btnTema.textContent = "☀️ Modo claro";
    state.tema = "dark";
  }

  // Guardar la elección del usuario
  localStorage.setItem("tema", state.tema);
}

// Aplicar el tema guardado al abrir la app
function cargarTemaGuardado() {
  const body = document.body;
  if (state.tema === "light") {
    body.classList.remove("bg-gray-900", "text-white");
    body.classList.add("bg-gray-100", "text-black");
    btnTema.textContent = "🌙 Modo oscuro";
  } else {
    body.classList.remove("bg-gray-100", "text-black");
    body.classList.add("bg-gray-900", "text-white");
    btnTema.textContent = "☀️ Modo claro";
  }
}

// Inicializamos el tema al cargar
cargarTemaGuardado();

// Evento para cambiar el tema al hacer clic
btnTema.addEventListener("click", cambiarTema);

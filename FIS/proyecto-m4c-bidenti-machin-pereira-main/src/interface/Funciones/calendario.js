// Definición de fechas de la semana
let startDate = moment().startOf("week");
let endDate = moment(startDate).add(6, "days");

//Cambia vista de calendarios en la interfaz
export function cambiarCalendario(semanal) {
  let calendarContainer = document.getElementById("calendarContainer");
  let weekSelector = document.getElementById("weekSelector");

  if (semanal) {
    // Ocultar el calendario completo y aplicar las clases específicas al selector de semana
    calendarContainer.className = "d-none"; // Oculta el calendario completo
    weekSelector.className =
      "week-selector d-none d-md-flex justify-content-center align-items-center"; // Aplica las clases específicas
    updateDateInputs(); // Actualiza los valores de los inputs de las fechas
  } else {
    // Mostrar el calendario completo y ocultar el selector de semana
    calendarContainer.className = "d-flex"; // Muestra el calendario completo
    weekSelector.className = "d-none"; // Oculta el selector de semana
  }
}

// Elementos del DOM para los inputs de las fechas
const startDateInput = document.getElementById("start-date");
const endDateInput = document.getElementById("end-date");
const previousWeekBtn = document.querySelector(".previous-week-btn");
const nextWeekBtn = document.querySelector(".next-week-btn");

// Función para actualizar los valores de las fechas
const updateDateInputs = () => {
  startDateInput.value = moment(startDate).format("DD/MM/YYYY");
  endDateInput.value = moment(endDate).format("DD/MM/YYYY");
};

// Función para navegar a la semana anterior
previousWeekBtn.addEventListener("click", () => {
  startDate = moment(startDate).subtract(7, "days").startOf("week");
  endDate = moment(startDate).add(6, "days");
  updateDateInputs();
});

// Función para navegar a la siguiente semana
nextWeekBtn.addEventListener("click", () => {
  startDate = moment(startDate).add(7, "days").startOf("week");
  endDate = moment(startDate).add(6, "days");
  updateDateInputs();
});

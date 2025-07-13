const ramos = [
  {
    nombre: "Inglés I",
    id: "ingles1",
    semestre: 1,
    desbloquea: ["ingles2"]
  },
  {
    nombre: "Cálculo I",
    id: "calculo1",
    semestre: 1,
    desbloquea: ["calculo2", "estadistica", "economia"]
  },
  {
    nombre: "Álgebra I",
    id: "algebra1",
    semestre: 1,
    desbloquea: ["algebra2"]
  },
  {
    nombre: "Física I",
    id: "fisica1",
    semestre: 1,
    desbloquea: ["fisica2"]
  },
  {
    nombre: "Introducción al diseño",
    id: "diseno",
    semestre: 1,
    desbloquea: ["programacion"]
  },
  {
    nombre: "Inglés II",
    id: "ingles2",
    semestre: 2,
    desbloquea: ["ingles3", "materiales", "cambientales"]
  },
  {
    nombre: "Cálculo II",
    id: "calculo2",
    semestre: 2,
    desbloquea: ["calculo3", "ecuaciones", "materiales", "cambientales"]
  },
  {
    nombre: "Álgebra II",
    id: "algebra2",
    semestre: 2,
    desbloquea: ["ecuaciones", "materiales", "cambientales"]
  },
  {
    nombre: "Física II",
    id: "fisica2",
    semestre: 2,
    desbloquea: ["estatica", "materiales", "cambientales"]
  },
  {
    nombre: "Fundamentos de programación",
    id: "programacion",
    semestre: 2,
    desbloquea: ["herramientas", "materiales", "cambientales"]
  },
  {
    nombre: "Análisis estadístico",
    id: "estadistica",
    semestre: 2,
    desbloquea: ["materiales", "cambientales"]
  },
  {
    nombre: "Fundamentos de economía",
    id: "economia",
    semestre: 2,
    desbloquea: []
  },

  // Puedes seguir agregando aquí los siguientes ramos...

];

const container = document.getElementById("malla-container");

// Agrupar ramos por semestre
const semestres = {};

ramos.forEach(ramo => {
  if (!semestres[ramo.semestre]) semestres[ramo.semestre] = [];
  semestres[ramo.semestre].push(ramo);
});

// Dibujar los semestres y ramos
Object.keys(semestres).forEach(semestre => {
  const box = document.createElement("div");
  box.className = "semestre";
  box.innerHTML = `<h3>Semestre ${semestre}</h3>`;

  semestres[semestre].forEach(ramo => {
    const div = document.createElement("div");
    div.className = "ramo locked";
    div.id = ramo.id;
    div.innerText = ramo.nombre;
    div.onclick = () => aprobarRamo(ramo.id);
    box.appendChild(div);
  });

  container.appendChild(box);
});

// Inicializar desbloqueos base
function actualizarDesbloqueos() {
  ramos.forEach(ramo => {
    const div = document.getElementById(ramo.id);
    const requisitos = ramos.filter(r => r.desbloquea.includes(ramo.id));
    const aprobados = requisitos.every(r => document.getElementById(r.id).classList.contains("approved"));

    if (requisitos.length === 0 || aprobados) {
      div.classList.remove("locked");
    }
  });
}

function aprobarRamo(id) {
  const el = document.getElementById(id);
  if (el.classList.contains("locked")) return;

  el.classList.add("approved");
  const ramo = ramos.find(r => r.id === id);

  if (ramo && ramo.desbloquea) {
    ramo.desbloquea.forEach(idDesbloqueado => {
      const desbloqueado = document.getElementById(idDesbloqueado);
      if (desbloqueado) desbloqueado.classList.remove("locked");
    });
  }

  actualizarDesbloqueos();
}

actualizarDesbloqueos();
                              

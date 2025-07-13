<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Malla Curricular Interactiva</title>
  <link rel="stylesheet" href="style.css" />
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      background-color: #fdf6f0;
      color: #333;
      margin: 0;
      padding: 20px;
      text-align: center;
    }

    h1 {
      color: #444;
    }

    #malla-container {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 15px;
      padding: 20px;
    }

    .semestre {
      background-color: #ffffff;
      border-radius: 10px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
      padding: 10px;
    }

    .semestre h3 {
      margin: 5px 0;
      font-size: 1.1em;
      color: #666;
    }

    .ramo {
      margin: 6px 0;
      padding: 10px;
      border-radius: 6px;
      background-color: #ffe4e1;
      cursor: pointer;
      transition: 0.3s;
      user-select: none;
    }

    .ramo.locked {
      opacity: 0.4;
      cursor: not-allowed;
    }

    .ramo.approved {
      background-color: #c1e1c1;
      text-decoration: line-through;
    }
  </style>
</head>
<body>
  <h1>Malla Curricular Interactiva</h1>
  <div id="malla-container"></div>
  <script>
    const ramos = [
      { nombre: "Inglés I", id: "ingles1", semestre: 1, desbloquea: ["ingles2"] },
      { nombre: "Cálculo I", id: "calculo1", semestre: 1, desbloquea: ["calculo2", "estadistica", "economia"] },
      { nombre: "Álgebra I", id: "algebra1", semestre: 1, desbloquea: ["algebra2"] },
      { nombre: "Física I", id: "fisica1", semestre: 1, desbloquea: ["fisica2"] },
      { nombre: "Introducción al diseño", id: "diseno", semestre: 1, desbloquea: ["programacion"] },
      { nombre: "Inglés II", id: "ingles2", semestre: 2, desbloquea: ["ingles3", "materiales", "cambientales"] },
      { nombre: "Cálculo II", id: "calculo2", semestre: 2, desbloquea: ["calculo3", "ecuaciones", "materiales", "cambientales"] },
      { nombre: "Álgebra II", id: "algebra2", semestre: 2, desbloquea: ["ecuaciones", "materiales", "cambientales"] },
      { nombre: "Física II", id: "fisica2", semestre: 2, desbloquea: ["estatica", "materiales", "cambientales"] },
      { nombre: "Fundamentos de programación", id: "programacion", semestre: 2, desbloquea: ["herramientas", "materiales", "cambientales"] },
      { nombre: "Análisis estadístico", id: "estadistica", semestre: 2, desbloquea: ["materiales", "cambientales"] },
      { nombre: "Fundamentos de economía", id: "economia", semestre: 2, desbloquea: [] },
      { nombre: "Inglés III", id: "ingles3", semestre: 3, desbloquea: ["ingles4"] },
      { nombre: "Cálculo III", id: "calculo3", semestre: 3, desbloquea: [] },
      { nombre: "Ecuaciones diferenciales", id: "ecuaciones", semestre: 3, desbloquea: ["estatica", "analisis"] },
      { nombre: "Estática aplicada", id: "estatica", semestre: 3, desbloquea: ["analisis"] },
      { nombre: "Herramientas computacionales", id: "herramientas", semestre: 3, desbloquea: ["topografia"] },
      { nombre: "Inglés IV", id: "ingles4", semestre: 4, desbloquea: ["inglesprof1", "taller1", "investigacion"] },
      { nombre: "Análisis estructural", id: "analisis", semestre: 4, desbloquea: ["mecanica"] },
      { nombre: "Topografía", id: "topografia", semestre: 4, desbloquea: ["edificacion"] },
      { nombre: "Materiales de ingeniería", id: "materiales", semestre: 4, desbloquea: ["hormigon"] },
      { nombre: "Ciencias ambientales", id: "cambientales", semestre: 4, desbloquea: ["fluidos"] },
      { nombre: "Taller de integración I", id: "taller1", semestre: 4, desbloquea: [] },
      { nombre: "Investigación de operaciones", id: "investigacion", semestre: 4, desbloquea: [] },
      { nombre: "Mecánica de sólidos", id: "mecanica", semestre: 5, desbloquea: ["sismica"] },
      { nombre: "Edificación", id: "edificacion", semestre: 5, desbloquea: ["suelos1", "herramientas2"] },
      { nombre: "Tecnología del hormigón", id: "hormigon", semestre: 5, desbloquea: [] },
      { nombre: "Mecánica de fluidos", id: "fluidos", semestre: 5, desbloquea: ["hidraulica"] },
      { nombre: "Ingeniería sísmica", id: "sismica", semestre: 6, desbloquea: ["acero", "hormigon1", "topico1"] },
      { nombre: "Mecánica de suelos I", id: "suelos1", semestre: 6, desbloquea: ["hormigon1", "suelos2", "taller2", "topico1"] },
      { nombre: "Herramientas computacionales II", id: "herramientas2", semestre: 6, desbloquea: ["taller2", "topico1"] },
      { nombre: "Hidráulica", id: "hidraulica", semestre: 6, desbloquea: ["taller2", "hidrologia", "topico1"] },
      { nombre: "Inglés profesional I", id: "inglesprof1", semestre: 6, desbloquea: ["inglesprof2", "topico1"] },
      { nombre: "Diseño de estructuras de acero", id: "acero", semestre: 7, desbloquea: ["taller3", "topico2", "topico3", "electivo1"] },
      { nombre: "Diseño en hormigón armado I", id: "hormigon1", semestre: 7, desbloquea: ["hormigon2", "topico2", "topico3", "electivo1"] },
      { nombre: "Mecánica de suelos II", id: "suelos2", semestre: 7, desbloquea: ["taller3", "caminos", "topico2", "topico3", "electivo1"] },
      { nombre: "Taller de integración II", id: "taller2", semestre: 7, desbloquea: ["evaluacion", "topico2", "topico3", "electivo1"] },
      { nombre: "Hidrología aplicada", id: "hidrologia", semestre: 7, desbloquea: ["redes", "topico2", "topico3", "electivo1"] },
      { nombre: "Inglés profesional II", id: "inglesprof2", semestre: 8, desbloquea: ["electivo2"] },
      { nombre: "Diseño de hormigón armado II", id: "hormigon2", semestre: 8, desbloquea: ["taller3", "electivo2"] },
      { nombre: "Diseño de caminos", id: "caminos", semestre: 8, desbloquea: ["vial", "electivo2"] },
      { nombre: "Evaluación de proyectos", id: "evaluacion", semestre: 8, desbloquea: ["admin", "planificacion", "electivo2"] },
      { nombre: "Redes de agua potable y alcantarillado", id: "redes", semestre: 8, desbloquea: ["gestion", "electivo2"] },
      { nombre: "Ingeniería vial", id: "vial", semestre: 9, desbloquea: ["seminario", "topico4"] },
      { nombre: "Administración de obras", id: "admin", semestre: 9, desbloquea: ["direccion", "seminario", "topico4"] },
      { nombre: "Planificación de proyectos", id: "planificacion", semestre: 9, desbloquea: ["seminario", "topico4"] },
      { nombre: "Tópico de especialidad II", id: "topico2", semestre: 9, desbloquea: ["seminario", "topico4"] },
      { nombre: "Tópico de especialidad III", id: "topico3", semestre: 9, desbloquea: ["seminario", "topico4"] },
      { nombre: "Electivo I", id: "electivo1", semestre: 9, desbloquea: ["seminario", "topico4"] },
      { nombre: "Taller de integración III", id: "taller3", semestre: 10, desbloquea: ["titulo"] },
      { nombre: "Dirección de empresas", id: "direccion", semestre: 10, desbloquea: ["titulo"] },
      { nombre: "Gestión ambiental y ocupacional", id: "gestion", semestre: 10, desbloquea: ["titulo"] },
      { nombre: "Seminario de titulación", id: "seminario", semestre: 10, desbloquea: ["titulo"] },
      { nombre: "Tópico de especialidad IV", id: "topico4", semestre: 10, desbloquea: ["titulo"] },
      { nombre: "Trabajo de titulación", id: "titulo", semestre: 11, desbloquea: [] },
      { nombre: "Electivo II", id: "electivo2", semestre: 8, desbloquea: [] },
      { nombre: "Tópico de especialidad I", id: "topico1", semestre: 6, desbloquea: [] },
    ];

    const container = document.getElementById("malla-container");
    const semestres = {};

    ramos.forEach(ramo => {
      if (!semestres[ramo.semestre]) semestres[ramo.semestre] = [];
      semestres[ramo.semestre].push(ramo);
    });

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

    function actualizarDesbloqueos() {
      ramos.forEach(ramo => {
        const div = document.getElementById(ramo.id);
        const requisitos = ramos.filter(r => r.desbloquea.includes(ramo.id));
        const aprobados = requisitos.every(r => document.getElementById(r.id).classList.contains("approved"));
        if (requisitos.length === 0 || aprobados) div.classList.remove("locked");
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
  </script>
</body>
</html>
      

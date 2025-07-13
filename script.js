<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Malla Curricular Interactiva</title>
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
    document.addEventListener("DOMContentLoaded", function () {
      const ramos = [
        { nombre: "Inglés I", id: "ingles1", semestre: 1, desbloquea: ["ingles2"] },
        { nombre: "Cálculo I", id: "calculo1", semestre: 1, desbloquea: ["calculo2"] },
        { nombre: "Álgebra I", id: "algebra1", semestre: 1, desbloquea: ["algebra2"] },
        { nombre: "Física I", id: "fisica1", semestre: 1, desbloquea: ["fisica2"] },
        { nombre: "Inglés II", id: "ingles2", semestre: 2, desbloquea: ["ingles3"] },
        { nombre: "Cálculo II", id: "calculo2", semestre: 2, desbloquea: ] },
        { nombre: "Álgebra II", id: "algebra2", semestre: 2, desbloquea: [] },
        { nombre: "Física II", id: "fisica2", semestre: 2, desbloquea: [] },
        { nombre: "Tópico de especialidad I", id: "topico1", semestre: 6, desbloquea: [] }
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
          const prerrequisitos = ramos.filter(r => r.desbloquea && r.desbloquea.includes(ramo.id));
          const desbloqueado = prerrequisitos.every(r => {
            const el = document.getElementById(r.id);
            return el && el.classList.contains("approved");
          });

          if (prerrequisitos.length === 0 || desbloqueado || ramo.semestre === 1) {
            div.classList.remove("locked");
          }
        });
      }

      function aprobarRamo(id) {
        const el = document.getElementById(id);
        if (el.classList.contains("locked") || el.classList.contains("approved")) return;
        el.classList.add("approved");
        actualizarDesbloqueos();
      }

      actualizarDesbloqueos();
    });
  </script>
</body>
</html>

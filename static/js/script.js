function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + "=")) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

//
function getAllEstados(url) {
  fetch(url, {
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Error al obtener los estados");
      }
      return response.json();
    })
    .then(data => {
      const lista = document.getElementById("estados-lista");
      lista.innerHTML = "";

      data.context.forEach(estado => {
        const li = document.createElement("li");

        const a = document.createElement("button");
        a.textContent = estado.nombre;
        a.className = "btn btn-outline-secondary w-100";
        a.dataset.id = estado.id;
        a.dataset.nombre = estado.nombre;
        a.type = "button";

        li.classList.add("list-group-item");
        li.appendChild(a);
        lista.appendChild(li);
      });

      const botones = lista.querySelectorAll("button")
      botones.forEach(function (btn) {
          btn.addEventListener("click", function() {
              const estadoId = btn.dataset.id;
              const estadoNombre = btn.dataset.nombre;
              cargarMunicipios(estadoId, estadoNombre);
          })
      })

    })
    .catch(error => console.error("Error:", error));
}

//Registrar estado
function addEstado(url, formData) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "X-CSRFToken": getCookie("csrftoken"),
    },
    body: JSON.stringify(formData),
  })
  .then(function(response) {
    if (!response.ok) {
      throw new Error("Error al agregar estado");
    }
    return response.json();
  });
}


function cargarMunicipios(estadoId, estadoNombre) {
    const url = municipiosBaseUrl.replace("0", estadoId);
    fetch(url, { headers: { "X-Requested-With": "XMLHttpRequest" } })
        .then(function (response) {
            if (!response.ok) throw new Error("Error al obtener municipios");
            return response.json();
        })
        .then(function (data) {
            const modalTitle = document.getElementById("municipiosModalLabel")
            const modalBody = document.getElementById("municipios-lista");

            modalTitle.textContent = "Municipios de " + estadoNombre;
            modalBody.innerHTML = "";

            if (data.context.length === 0) {
                modalBody.innerHTML = "<p class='text-muted'>No hay municipios registrados.</p>";
            } else {
                const list = document.createElement("ul");
                list.classList.add("list-group");
                data.context.forEach(function(mun) {
                    const li = document.createElement("li");
                    li.classList.add("list-group-item");
                    li.textContent = mun.nombre;
                    list.appendChild(li);
                });
                modalBody.appendChild(list);
            }
            const modal = new bootstrap.Modal(document.getElementById("municipiosModal"));
            modal.show();
        })
        .catch(function (error) {
            console.error(error);
        });
}
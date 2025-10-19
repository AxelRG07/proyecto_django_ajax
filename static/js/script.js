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
        li.classList.add("list-group-item");
        li.textContent = estado.nombre;
        lista.appendChild(li);
      });
    })
    .catch(error => console.error("Error:", error));
}

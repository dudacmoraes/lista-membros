const tbody = document.getElementById("memberData");
const searchInput = document.getElementById("searchInput");
const contador = document.getElementById("contador");

let membros = [];

fetch("membros.json")
  .then(res => res.json())
  .then(data => {
    membros = data;
    renderTabela(membros);
  });

function renderTabela(lista) {
  tbody.innerHTML = "";

  lista.forEach(m => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${m.nome}</td>
      <td>${m.empresa}</td>
      <td>${m.categoria}</td>
      <td>${m.telefone}</td>
      <td style="text-align:center">
        <a class="email-link" href="mailto:${m.email}">✉</a>
      </td>
    `;

    tbody.appendChild(tr);
  });

  contador.textContent = `${lista.length} membro(s) encontrado(s)`;
}

searchInput.addEventListener("keyup", () => {
  const termo = searchInput.value.toUpperCase();

  const filtrados = membros.filter(m =>
    Object.values(m).some(valor =>
      valor.toUpperCase().includes(termo)
    )
  );

  renderTabela(filtrados);
});

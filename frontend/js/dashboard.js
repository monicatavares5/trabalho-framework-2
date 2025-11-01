// Dashboard
checkAuth();

const user = Auth.getUser();
document.getElementById("userName").textContent = `Olá, ${user.nome}`;

const messageDiv = document.getElementById("message");
const equipamentosGrid = document.getElementById("equipamentosGrid");
const logoutBtn = document.getElementById("logoutBtn");

// Modais
const equipamentoModal = document.getElementById("equipamentoModal");
const detalhesModal = document.getElementById("detalhesModal");
const manutencaoModal = document.getElementById("manutencaoModal");

const equipamentoForm = document.getElementById("equipamentoForm");
const manutencaoForm = document.getElementById("manutencaoForm");

let currentEquipamentoId = null;

// Função para mostrar mensagens
function showMessage(message, type) {
   messageDiv.textContent = message;
   messageDiv.className = `message ${type}`;
   messageDiv.classList.remove("hidden");

   setTimeout(() => {
      messageDiv.classList.add("hidden");
   }, 5000);
}

// Logout
logoutBtn.addEventListener("click", () => {
   Auth.logout();
});

// Carregar equipamentos
async function loadEquipamentos() {
   try {
      const response = await fetch(API_ENDPOINTS.EQUIPAMENTOS, {
         headers: Auth.getAuthHeaders(),
      });

      if (response.status === 401) {
         showMessage("Sessão expirada. Faça login novamente.", "error");
         setTimeout(() => Auth.logout(), 2000);
         return;
      }

      const equipamentos = await response.json();

      if (equipamentos.length === 0) {
         equipamentosGrid.innerHTML = '<div class="empty-state"><p>Nenhum equipamento cadastrado</p></div>';
         return;
      }

      equipamentosGrid.innerHTML = equipamentos
         .map(
            (eq) => `
            <div class="equipamento-card">
                <h3>${eq.nome}</h3>
                <span class="status-badge ${getStatusClass(eq.status)}">${eq.status}</span>
                <p><strong>Descrição:</strong> ${eq.descricao || "Sem descrição"}</p>
                <p><strong>Adicionado:</strong> ${formatDate(eq.data_adicionado)}</p>
                <div class="card-actions">
                    <button class="btn btn-primary btn-small" onclick="viewDetails(${eq.id})">Ver Detalhes</button>
                    <button class="btn btn-secondary btn-small" onclick="editEquipamento(${eq.id})">Editar</button>
                    <button class="btn btn-danger btn-small" onclick="deleteEquipamento(${eq.id})">Excluir</button>
                </div>
            </div>
        `
         )
         .join("");
   } catch (error) {
      showMessage("Erro ao carregar equipamentos", "error");
      console.error("Erro:", error);
   }
}

// Adicionar equipamento
document.getElementById("addEquipamentoBtn").addEventListener("click", () => {
   currentEquipamentoId = null;
   document.getElementById("modalTitle").textContent = "Adicionar Equipamento";
   equipamentoForm.reset();
   equipamentoModal.classList.remove("hidden");
});

// Salvar equipamento
equipamentoForm.addEventListener("submit", async (e) => {
   e.preventDefault();

   const data = {
      nome: document.getElementById("nome").value,
      descricao: document.getElementById("descricao").value,
      status: document.getElementById("status").value,
   };

   try {
      const url = currentEquipamentoId ? `${API_ENDPOINTS.EQUIPAMENTOS}/${currentEquipamentoId}` : API_ENDPOINTS.EQUIPAMENTOS;

      const method = currentEquipamentoId ? "PUT" : "POST";

      const response = await fetch(url, {
         method,
         headers: Auth.getAuthHeaders(),
         body: JSON.stringify(data),
      });

      if (response.ok || response.status === 201) {
         showMessage(`Equipamento ${currentEquipamentoId ? "atualizado" : "criado"} com sucesso!`, "success");
         equipamentoModal.classList.add("hidden");
         loadEquipamentos();
      } else {
         const error = await response.json();
         showMessage(error.message || "Erro ao salvar equipamento", "error");
      }
   } catch (error) {
      showMessage("Erro ao conectar com o servidor", "error");
      console.error("Erro:", error);
   }
});

// Editar equipamento
async function editEquipamento(id) {
   try {
      const response = await fetch(`${API_ENDPOINTS.EQUIPAMENTOS}/${id}`, {
         headers: Auth.getAuthHeaders(),
      });

      if (response.ok) {
         const equipamento = await response.json();
         currentEquipamentoId = id;

         document.getElementById("modalTitle").textContent = "Editar Equipamento";
         document.getElementById("nome").value = equipamento.nome;
         document.getElementById("descricao").value = equipamento.descricao || "";
         document.getElementById("status").value = equipamento.status;

         equipamentoModal.classList.remove("hidden");
      }
   } catch (error) {
      showMessage("Erro ao carregar equipamento", "error");
      console.error("Erro:", error);
   }
}

// Excluir equipamento
async function deleteEquipamento(id) {
   if (!confirm("Tem certeza que deseja excluir este equipamento?")) {
      return;
   }

   try {
      const response = await fetch(`${API_ENDPOINTS.EQUIPAMENTOS}/${id}`, {
         method: "DELETE",
         headers: Auth.getAuthHeaders(),
      });

      if (response.ok) {
         showMessage("Equipamento excluído com sucesso!", "success");
         loadEquipamentos();
      } else {
         const error = await response.json();
         showMessage(error.message || "Erro ao excluir equipamento", "error");
      }
   } catch (error) {
      showMessage("Erro ao conectar com o servidor", "error");
      console.error("Erro:", error);
   }
}

// Ver detalhes
async function viewDetails(id) {
   try {
      const [equipamentoRes, manutencoesRes] = await Promise.all([
         fetch(`${API_ENDPOINTS.EQUIPAMENTOS}/${id}`, {
            headers: Auth.getAuthHeaders(),
         }),
         fetch(`${API_ENDPOINTS.MANUTENCAO}/${id}`, {
            headers: Auth.getAuthHeaders(),
         }),
      ]);

      if (equipamentoRes.ok && manutencoesRes.ok) {
         const equipamento = await equipamentoRes.json();
         const manutencoes = await manutencoesRes.json();

         document.getElementById("equipamentoDetalhes").innerHTML = `
                <div class="detalhe-item">
                    <strong>Nome:</strong>
                    <p>${equipamento.nome}</p>
                </div>
                <div class="detalhe-item">
                    <strong>Descrição:</strong>
                    <p>${equipamento.descricao || "Sem descrição"}</p>
                </div>
                <div class="detalhe-item">
                    <strong>Status:</strong>
                    <p><span class="status-badge ${getStatusClass(equipamento.status)}">${equipamento.status}</span></p>
                </div>
                <div class="detalhe-item">
                    <strong>Data de Adição:</strong>
                    <p>${formatDate(equipamento.data_adicionado)}</p>
                </div>
            `;

         const manutencoesLista = document.getElementById("manutencoesLista");
         if (manutencoes.length === 0) {
            manutencoesLista.innerHTML = '<div class="empty-state"><p>Nenhuma manutenção registrada</p></div>';
         } else {
            manutencoesLista.innerHTML = manutencoes
               .map(
                  (m) => `
                    <div class="manutencao-item">
                        <p><strong>Data:</strong> ${formatDate(m.data)}</p>
                        <p><strong>Descrição:</strong> ${m.descricao}</p>
                        <p><strong>Status:</strong> <span class="status-badge ${getStatusClass(m.status)}">${m.status}</span></p>
                    </div>
                `
               )
               .join("");
         }

         currentEquipamentoId = id;
         detalhesModal.classList.remove("hidden");
      }
   } catch (error) {
      showMessage("Erro ao carregar detalhes", "error");
      console.error("Erro:", error);
   }
}

// Adicionar manutenção
document.getElementById("addManutencaoBtn").addEventListener("click", () => {
   document.getElementById("manutencaoEquipamentoId").value = currentEquipamentoId;

   // Definir data/hora atual
   const now = new Date();
   now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
   document.getElementById("dataManutencao").value = now.toISOString().slice(0, 16);

   manutencaoModal.classList.remove("hidden");
});

// Salvar manutenção
manutencaoForm.addEventListener("submit", async (e) => {
   e.preventDefault();

   const equipamentoId = document.getElementById("manutencaoEquipamentoId").value;
   const data = {
      data: document.getElementById("dataManutencao").value,
      descricao: document.getElementById("descricaoManutencao").value,
      status: document.getElementById("statusManutencao").value,
   };

   try {
      const response = await fetch(`${API_ENDPOINTS.MANUTENCAO}/${equipamentoId}`, {
         method: "POST",
         headers: Auth.getAuthHeaders(),
         body: JSON.stringify(data),
      });

      if (response.ok || response.status === 201) {
         showMessage("Manutenção registrada com sucesso!", "success");
         manutencaoModal.classList.add("hidden");
         manutencaoForm.reset();
         viewDetails(equipamentoId);
      } else {
         const error = await response.json();
         showMessage(error.message || "Erro ao registrar manutenção", "error");
      }
   } catch (error) {
      showMessage("Erro ao conectar com o servidor", "error");
      console.error("Erro:", error);
   }
});

// Fechar modais
document.querySelectorAll(".close").forEach((closeBtn) => {
   closeBtn.addEventListener("click", () => {
      equipamentoModal.classList.add("hidden");
      detalhesModal.classList.add("hidden");
      manutencaoModal.classList.add("hidden");
   });
});

document.getElementById("cancelBtn").addEventListener("click", () => {
   equipamentoModal.classList.add("hidden");
});

document.getElementById("cancelManutencaoBtn").addEventListener("click", () => {
   manutencaoModal.classList.add("hidden");
});

// Fechar modal ao clicar fora
window.addEventListener("click", (e) => {
   if (e.target === equipamentoModal) {
      equipamentoModal.classList.add("hidden");
   }
   if (e.target === detalhesModal) {
      detalhesModal.classList.add("hidden");
   }
   if (e.target === manutencaoModal) {
      manutencaoModal.classList.add("hidden");
   }
});

// Funções auxiliares
function getStatusClass(status) {
   const statusMap = {
      Disponível: "disponivel",
      "Em uso": "em-uso",
      "Em manutenção": "em-manutencao",
      Pendente: "em-manutencao",
      Concluída: "disponivel",
   };
   return statusMap[status] || "";
}

function formatDate(dateString) {
   const date = new Date(dateString);
   return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
   });
}

// Carregar equipamentos ao iniciar
loadEquipamentos();

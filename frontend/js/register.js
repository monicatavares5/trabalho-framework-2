// Registro
if (typeof redirectIfAuthenticated === "function") {
   redirectIfAuthenticated();
}

document.addEventListener("DOMContentLoaded", function () {
   const registerForm = document.getElementById("registerForm");
   const messageDiv = document.getElementById("message");

   function showMessage(message, type) {
      messageDiv.textContent = message;
      messageDiv.className = `message ${type}`;
      messageDiv.classList.remove("hidden");
      setTimeout(() => messageDiv.classList.add("hidden"), 5000);
   }

   registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const nome = document.getElementById("nome").value;
      const email = document.getElementById("email").value;
      const senha = document.getElementById("senha").value;

      try {
         const response = await fetch(API_ENDPOINTS.REGISTER, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, email, senha }),
         });

         const data = await response.json();

         if (response.ok || response.status === 201) {
            showMessage("Cadastro realizado com sucesso! Redirecionando...", "success");
            setTimeout(() => (window.location.href = "index.html"), 2000);
         } else {
            showMessage(data.message || "Erro ao fazer cadastro", "error");
         }
      } catch (error) {
         showMessage("Erro ao conectar com o servidor", "error");
      }
   });
});

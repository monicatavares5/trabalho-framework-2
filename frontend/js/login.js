// Login
if (typeof redirectIfAuthenticated === "function") {
   redirectIfAuthenticated();
}

const loginForm = document.getElementById("loginForm");
const messageDiv = document.getElementById("message");

function showMessage(message, type) {
   messageDiv.textContent = message;
   messageDiv.className = `message ${type}`;
   messageDiv.classList.remove("hidden");

   setTimeout(() => {
      messageDiv.classList.add("hidden");
   }, 5000);
}

loginForm.addEventListener("submit", async (e) => {
   e.preventDefault();

   const email = document.getElementById("email").value;
   const senha = document.getElementById("senha").value;

   try {
      const response = await fetch(API_ENDPOINTS.LOGIN, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (response.ok) {
         Auth.setToken(data.data.accessToken);
         Auth.setUser({
            id: data.data.id,
            nome: data.data.nome,
            email: data.data.email,
         });

         window.location.href = "dashboard.html";
      } else {
         showMessage(data.message || "Erro ao fazer login", "error");
      }
   } catch (error) {
      showMessage("Erro ao conectar com o servidor", "error");
      console.error("Erro:", error);
   }
});

// Funções de autenticação
const Auth = {
    setToken(token) {
        localStorage.setItem('token', token);
    },

    getToken() {
        return localStorage.getItem('token');
    },

    setUser(user) {
        localStorage.setItem('user', JSON.stringify(user));
    },

    getUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    clearAuth() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    isAuthenticated() {
        return !!this.getToken();
    },

    logout() {
        this.clearAuth();
        window.location.href = 'index.html';
    },

    getAuthHeaders() {
        const token = this.getToken();
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
    }
};

// Verificar autenticação em páginas protegidas
function checkAuth() {
    if (!Auth.isAuthenticated()) {
        window.location.href = 'index.html';
    }
}

// Redirecionar se já estiver autenticado (para páginas de login/registro)
function redirectIfAuthenticated() {
    if (Auth.isAuthenticated()) {
        window.location.href = 'dashboard.html';
    }
}

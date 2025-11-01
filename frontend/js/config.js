// Configuração da API
// Detecta se está rodando no Docker ou localmente
const API_BASE_URL = window.location.hostname === 'localhost' && window.location.port === '8080'
    ? 'http://localhost:3000'  // Docker
    : 'http://localhost:3000'; // Desenvolvimento local

const API_ENDPOINTS = {
   LOGIN: `${API_BASE_URL}/login`,
   REGISTER: `${API_BASE_URL}/login/register`,
   EQUIPAMENTOS: `${API_BASE_URL}/equipamentos`,
   MANUTENCAO: `${API_BASE_URL}/manutencao`,
};

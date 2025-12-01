// src/services/api.js
import axios from "axios";

const API_BASE = "http://localhost:3000";

// Configuração global do axios com interceptor para adicionar token
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para adicionar o token automaticamente em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.error || error.message;
    console.error("Erro na requisição:", message);
    return Promise.reject(new Error(message));
  }
);

// ========== COMENTÁRIOS ==========
export const commentService = {
  // Listar todos
  getAll: async () => {
    const res = await api.get("/comments");
    return res.data;
  },

  // Listar por comunidade
  getByComunidade: async (comunidadeId) => {
    const res = await api.get(`/comments/comunidade/${comunidadeId}`);
    return res.data;
  },

  // Listar por track
  getByTrack: async (trackId) => {
    const res = await api.get(`/comments/track/${trackId}`);
    return res.data;
  },

  // Criar comentário
  create: async (data) => {
    const res = await api.post("/comments", data);
    return res.data;
  },

  // Atualizar comentário
  update: async (id, texto) => {
    const res = await api.put(`/comments/${id}`, { texto });
    return res.data;
  },

  // Deletar comentário
  delete: async (id) => {
    const res = await api.delete(`/comments/${id}`);
    return res.data;
  },
};

// ========== USUÁRIOS ==========
export const userService = {
  register: async (userData) => {
    const res = await api.post("/user/register", userData);
    return res.data;
  },

  login: async (credentials) => {
    const res = await api.post("/user/login", credentials);
    return res.data;
  },

  googleLogin: async (token) => {
    const res = await api.post("/auth/google", { token });
    return res.data;
  },

  update: async (userData) => {
    const res = await api.put("/user/update", userData);
    return res.data;
  },

  me: async () => {
    const res = await api.get("/user/me");
    return res.data;
  },
};

// Exporta a instância configurada do axios para uso direto se necessário
export default api;
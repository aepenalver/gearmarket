import axios from 'axios';
import { mockPublications, mockUser } from '../data/mockData';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1',
  timeout: 5000,
});

const wait = (data) => new Promise((resolve) => setTimeout(() => resolve({ data }), 250));

export const authService = {
  login: async (payload) => {
    try {
      return await api.post('/auth/login', payload);
    } catch {
      return wait({ token: 'mock-jwt-token', user: mockUser });
    }
  },
  register: async (payload) => {
    try {
      return await api.post('/auth/register', payload);
    } catch {
      return wait({
        message: 'Usuario registrado correctamente',
        user: { id: 99, name: payload.name, email: payload.email },
      });
    }
  },
};

export const publicationsService = {
  getAll: async () => {
    try {
      return await api.get('/publications');
    } catch {
      return wait(mockPublications);
    }
  },
  getById: async (id) => {
    try {
      return await api.get(`/publications/${id}`);
    } catch {
      const publication = mockPublications.find((item) => item.id === Number(id));
      return wait(publication);
    }
  },
  create: async (payload) => {
    try {
      return await api.post('/publications', payload);
    } catch {
      return wait({ message: 'Publicación creada correctamente', publication_id: Date.now() });
    }
  },
};

export default api;

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { mockPublications, mockUser } from '../data/mockData';
import { authService, publicationsService } from '../services/api';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('gearmarket_user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('gearmarket_token'));
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    category: 'todos',
  });

  useEffect(() => {
    localStorage.setItem('gearmarket_token', token || '');
    if (user) {
      localStorage.setItem('gearmarket_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('gearmarket_user');
    }
  }, [token, user]);

  useEffect(() => {
    fetchPublications();
  }, []);

  const fetchPublications = async () => {
    setLoading(true);
    try {
      const response = await publicationsService.getAll();
      setPublications(response.data || []);
    } catch {
      setPublications(mockPublications);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    const response = await authService.login(credentials);
    setUser(response.data.user || mockUser);
    setToken(response.data.token || 'mock-jwt-token');
    return response.data;
  };

  const register = async (payload) => {
    const response = await authService.register(payload);
    setUser(response.data.user || mockUser);
    setToken('mock-jwt-token');
    return response.data;
  };

  const logout = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('gearmarket_token');
    localStorage.removeItem('gearmarket_user');
  };

  const toggleFavorite = (publicationId) => {
    setPublications((current) =>
      current.map((publication) =>
        publication.id === publicationId
          ? { ...publication, isFavorite: !publication.isFavorite }
          : publication,
      ),
    );
  };

  const createPublication = async (payload) => {
    const response = await publicationsService.create(payload);
    const newPublication = {
      id: response.data.publication_id || Date.now(),
      ...payload,
      seller: user || mockUser,
      isFavorite: false,
      condition: payload.condition || 'Usado',
    };

    setPublications((current) => [newPublication, ...current]);
    return newPublication;
  };

  const filteredPublications = useMemo(() => {
    return publications.filter((publication) => {
      const matchSearch =
        publication.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        publication.location.toLowerCase().includes(filters.search.toLowerCase()) ||
        publication.category.toLowerCase().includes(filters.search.toLowerCase());

      const matchCategory =
        filters.category === 'todos' || publication.category === filters.category;

      return matchSearch && matchCategory;
    });
  }, [filters, publications]);

  const favorites = publications.filter((publication) => publication.isFavorite);
  const myPublications = publications.filter(
    (publication) => publication.seller?.id === (user?.id || mockUser.id),
  );

  const value = {
    user,
    token,
    loading,
    publications,
    filteredPublications,
    favorites,
    myPublications,
    filters,
    setFilters,
    login,
    register,
    logout,
    toggleFavorite,
    createPublication,
    fetchPublications,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useAppContext = () => useContext(AppContext);

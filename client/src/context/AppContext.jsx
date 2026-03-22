import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { mockPublications, mockUser } from '../data/mockData';
import { authService, publicationsService } from '../services/api';

const AppContext = createContext();
const PUBLICATIONS_STORAGE_KEY = 'gearmarket_publications';

const normalizePublication = (publication, currentUser = mockUser) => ({
  ...publication,
  id: Number(publication.id),
  price: Number(publication.price),
  seller: publication.seller || currentUser,
  isFavorite: Boolean(publication.isFavorite),
  condition: publication.condition || 'Usado',
});

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('gearmarket_user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('gearmarket_token'));
  const [publications, setPublications] = useState(() => {
    const storedPublications = localStorage.getItem(PUBLICATIONS_STORAGE_KEY);

    if (!storedPublications) {
      return [];
    }

    try {
      return JSON.parse(storedPublications).map((publication) => normalizePublication(publication));
    } catch {
      localStorage.removeItem(PUBLICATIONS_STORAGE_KEY);
      return [];
    }
  });
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
    localStorage.setItem(PUBLICATIONS_STORAGE_KEY, JSON.stringify(publications));
  }, [publications]);

  useEffect(() => {
    if (publications.length === 0) {
      fetchPublications();
    }
  }, []);

  const fetchPublications = async () => {
    setLoading(true);
    try {
      const response = await publicationsService.getAll();
      const sourceData = Array.isArray(response.data) && response.data.length > 0 ? response.data : mockPublications;
      setPublications(sourceData.map((publication) => normalizePublication(publication, user || mockUser)));
    } catch {
      setPublications(mockPublications.map((publication) => normalizePublication(publication, user || mockUser)));
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

  const getPublicationById = useCallback(
    (publicationId) =>
      publications.find((publication) => Number(publication.id) === Number(publicationId)) || null,
    [publications],
  );

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
    const newPublication = normalizePublication(
      {
        id: response.data.publication_id || Date.now(),
        ...payload,
        seller: user || mockUser,
        isFavorite: false,
      },
      user || mockUser,
    );

    setPublications((current) => [newPublication, ...current]);
    return newPublication;
  };

  const updatePublication = async (publicationId, payload) => {
    const updatedPublication = normalizePublication(
      {
        ...getPublicationById(publicationId),
        ...payload,
        id: Number(publicationId),
        seller: getPublicationById(publicationId)?.seller || user || mockUser,
      },
      user || mockUser,
    );

    try {
      await publicationsService.update(publicationId, updatedPublication);
    } catch {
      // Fallback local ya cubierto abajo.
    }

    setPublications((current) =>
      current.map((publication) =>
        Number(publication.id) === Number(publicationId) ? updatedPublication : publication,
      ),
    );

    return updatedPublication;
  };

  const deletePublication = async (publicationId) => {
    try {
      await publicationsService.remove(publicationId);
    } catch {
      // Fallback local ya cubierto abajo.
    }

    setPublications((current) =>
      current.filter((publication) => Number(publication.id) !== Number(publicationId)),
    );
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
    updatePublication,
    deletePublication,
    getPublicationById,
    fetchPublications,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useAppContext = () => useContext(AppContext);

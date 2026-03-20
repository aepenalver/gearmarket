import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PublicationForm from '../components/PublicationForm';
import SectionTitle from '../components/SectionTitle';
import { mockPublications } from '../data/mockData';

function EditPublicationPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [publication, setPublication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const data = mockPublications.find((item) => item.id === Number(id));

    if (data) {
      setPublication(data);
    }
    setLoading(false);
  }, [id]);

  const handleUpdate = async (updatedValues) => {
    setSubmitting(true);

    setTimeout(() => {
      console.log('Nuevos valores capturados:', updatedValues);
      alert('Cambios guardados en memoria (se perderán al recargar)');

      setSubmitting(false);
      navigate('/mis-publicaciones');
    }, 1000);
  };

  if (loading) return <div className='p-5 text-center'>Buscando publicación...</div>;
  if (!publication) return <div className='alert alert-danger'>Error: Publicación no encontrada.</div>;

  return (
    <section className='container py-4'>
      <SectionTitle eyebrow='Modo Editor' title={`Editando: ${publication.title}`} description='Los cambios realizados aquí solo persistirán durante esta sesión de navegador.' />

      <PublicationForm onSubmit={handleUpdate} submitting={submitting} initialData={publication} />
    </section>
  );
}

export default EditPublicationPage;

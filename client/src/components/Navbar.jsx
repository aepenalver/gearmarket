import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top shadow-sm">
      <div className="container py-2">
        <Link className="navbar-brand fw-bold text-primary d-flex align-items-center gap-2" to="/">
          <span className="brand-badge">GM</span>
          GearMarket
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Abrir navegación"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            <li className="nav-item">
              <NavLink className="nav-link" to="/galeria">
                Galería
              </NavLink>
            </li>

            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/perfil">
                    Perfil
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/mis-publicaciones">
                    Mis publicaciones
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/favoritos">
                    Favoritos
                  </NavLink>
                </li>
                <li className="nav-item ms-lg-3">
                  <span className="small text-body-secondary d-block">Hola, {user?.name}</span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-primary btn-sm" onClick={handleLogout}>
                    Cerrar sesión
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Ingresar
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="btn btn-primary btn-sm px-3" to="/registro">
                    Crear cuenta
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

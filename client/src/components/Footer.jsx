function Footer() {
  return (
    <footer className="border-top bg-white mt-auto">
      <div className="container py-4 d-flex flex-column flex-lg-row justify-content-between gap-3">
        <div>
          <h6 className="fw-bold mb-1">GearMarket</h6>
          <p className="text-body-secondary mb-0">
            Marketplace especializado en artículos deportivos usados y seminuevos.
          </p>
        </div>
        <div className="text-body-secondary small">
          Hito 2 · React Router · Context API · Hooks · Bootstrap
        </div>
      </div>
    </footer>
  );
}

export default Footer;

// components/Header.tsx
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { Routes } from '#core';

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-green-800 shadow-md py-4 px-6 w-full">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo a la izquierda */}
        <div className="text-4xl font-bold text-white">zoologic</div>

        {/* Botón catálogo (solo si no estamos en catálogo) */}
        <Button
          label="Regresar"
          icon="pi pi-book"
          className="p-button-rounded p-button-outlined ml-auto text-white border-white"
          onClick={() => navigate(Routes.LANDING_ROUTE)}
        />

      </div>
    </div>
  );
};

export default Header;

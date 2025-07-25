import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "#core"; // Asegúrate de tener tus rutas correctamente importadas

const useAuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const rol = localStorage.getItem("rol");

    // Verificar si el usuario ya está autenticado
    if (token && rol) {
      if (rol === "2") {
        navigate(Routes.LANDING_ROUTE, { replace: true });
      } else {
        navigate(Routes.EMPLEADOS_ROUTE, { replace: true });
      }
    }
  }, [navigate]);
};

export default useAuthRedirect;

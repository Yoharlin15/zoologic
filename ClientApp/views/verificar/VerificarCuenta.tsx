import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useConfirmarCorreo } from '../../hooks/useMutation/useMutationSignup';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Message } from 'primereact/message';
import { Divider } from 'primereact/divider';

const VerificarCuenta = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  const { mutate, isSuccess, isError, isPending, error } = useConfirmarCorreo();

  useEffect(() => {
    if (token) {
      mutate(token);
    }
  }, [token, mutate]);

  const handleGoToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="flex justify-content-center align-items-center min-h-screen bg-gray-100 p-3">
      <Card className="w-full md:w-6" style={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
        {isPending && (
          <div className="flex flex-column align-items-center py-6">
            <ProgressSpinner 
              style={{ width: '50px', height: '50px' }} 
              strokeWidth="4" 
              animationDuration=".5s" 
            />
            <h2 className="mt-4 mb-1">Verificando tu cuenta</h2>
            <p className="text-gray-600 mt-2">Por favor espera un momento...</p>
          </div>
        )}

        {isSuccess && (
          <div className="text-center py-4">
            <i 
              className="pi pi-check-circle" 
              style={{ fontSize: '4rem', color: 'var(--green-500)' }} 
            />
            <h2 className="mt-4 mb-2">¡Cuenta verificada con éxito!</h2>
            <p className="text-gray-700 mb-4">
              Tu dirección de correo electrónico ha sido confirmada correctamente.
            </p>
            <Divider />
            <Button
              label="Ir al Inicio de Sesión"
              icon="pi pi-sign-in"
              className="p-button-success"
              onClick={handleGoToLogin}
            />
          </div>
        )}

        {isError && (
          <div className="text-center py-4">
            <i 
              className="pi pi-times-circle" 
              style={{ fontSize: '4rem', color: 'var(--red-500)' }} 
            />
            <h2 className="mt-4 mb-2">Error al verificar la cuenta</h2>
            <p className="text-gray-700 mb-4">
              {(() => {
                // Try to extract a message from known error shapes (e.g., AxiosError)
                if (
                  error &&
                  typeof error === 'object' &&
                  'response' in error &&
                  (error as any).response?.data?.message
                ) {
                  return (error as any).response.data.message;
                }
                return error?.message || 'El token es inválido o ha expirado.';
              })()}
            </p>
            <div className="flex justify-content-center gap-3">
              <Button
                label="Reintentar"
                icon="pi pi-refresh"
                className="p-button-secondary"
                onClick={() => window.location.reload()}
              />
              <Button
                label="Contactar Soporte"
                icon="pi pi-envelope"
                className="p-button-help"
                onClick={() => navigate('/contact')}
              />
            </div>
          </div>
        )}

        {!token && (
          <div className="py-4">
            <Message 
              severity="error" 
              text="Token no proporcionado" 
              className="w-full mb-3" 
            />
            <p className="text-gray-700">
              No se encontró un token de verificación en la URL. Por favor, asegúrate de haber accedido desde el enlace correcto en tu correo electrónico.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default VerificarCuenta;

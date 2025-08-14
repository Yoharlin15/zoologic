import React from 'react';
import { Card } from 'primereact/card';
import { Avatar } from 'primereact/avatar';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Divider } from 'primereact/divider';
import { Tag } from 'primereact/tag';
import { useFetchOneEmpleado, useFetchOneUsuario } from 'ClientApp/hooks/useFetch';
import { useAuth } from 'ClientApp/contexts/AuthContext/AuthContext';

const getInitials = (fullName?: string) => {
  if (!fullName) return '';
  return fullName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(p => p[0]?.toUpperCase() ?? '')
    .join('');
};

const PerfilUsuario: React.FC = () => {
  const { usuarioId, empleadoId } = useAuth();

  const hasEmpleado = !!empleadoId;

  // Usuario
  const { data: usuario, isLoading: isLoadingUsuario, error: errorUsuario } = useFetchOneUsuario(usuarioId!);

  // Empleado (solo si hay empleadoId)
  type EmpleadoQuery = { data: any; isLoading: boolean; error: any };
  const {
    data: empleado,
    isLoading: isLoadingEmpleado,
    error: errorEmpleado
  }: EmpleadoQuery = hasEmpleado
    ? useFetchOneEmpleado(empleadoId!)
    : { data: null, isLoading: false, error: null };

  // Loaders
  if (isLoadingUsuario || (hasEmpleado && isLoadingEmpleado)) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ProgressSpinner />
      </div>
    );
  }

  // Errores
  if (errorUsuario) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Card className="max-w-md w-full text-center p-4">
          <div className="text-red-500">
            Error al cargar el perfil del usuario: {errorUsuario.message}
          </div>
        </Card>
      </div>
    );
  }

  if (hasEmpleado && errorEmpleado) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Card className="max-w-md w-full text-center p-4">
          <div className="text-red-500">
            Error al cargar la información de contacto: {errorEmpleado.message}
          </div>
        </Card>
      </div>
    );
  }

  if (!usuario) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Card className="max-w-md w-full text-center p-4">
          <div className="text-red-500">No se pudo cargar el perfil del usuario.</div>
        </Card>
      </div>
    );
  }

  // Nombre a mostrar y label del avatar
  const displayName = empleado
    ? `${empleado.Nombres} ${empleado.Apellidos}`
    : usuario.Nombres ?? `@${usuario.NombreUsuario}`;

  const avatarLabel = empleado
    ? getInitials(`${empleado.Nombres} ${empleado.Apellidos}`)
    : getInitials(usuario.Nombres ?? usuario.NombreUsuario);

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-50 p-4 md:items-center">
      <Card className="w-full max-w-2xl" style={{ borderRadius: '1rem' }}>
        {/* Header con foto de perfil */}
        <div
          className="p-6 text-center relative"
          style={{
            background: 'linear-gradient(135deg, #49e954ff 0%, #2da956ff 100%)',
            borderTopLeftRadius: '1rem',
            borderTopRightRadius: '1rem',
            margin: '-1rem -1rem 1rem -1rem'
          }}
        >
          <Avatar
            label={!usuario.ImagenUrl ? avatarLabel : undefined}
            size="xlarge"
            shape="circle"
            image={usuario.ImagenUrl ?? undefined}
            className="mb-4 border-4 border-white shadow-2xl"
            style={{
              width: '120px',
              height: '120px',
              fontSize: '2.5rem',
              backgroundColor: 'white'
            }}
          />

          <h1 className="text-2xl font-bold text-white mb-1">{displayName}</h1>
          <p className="text-white mb-2">@{usuario.NombreUsuario}</p>
        </div>

        {/* Sección Información de Usuario */}
        <div className="p-4 mb-2">
          <div className="flex align-items-center mb-3">
            <i className="pi pi-user-edit mr-2 text-blue-500"></i>
            <h2 className="text-lg font-semibold text-gray-700 m-0">
              Información de Usuario
            </h2>
          </div>

          <Divider className="my-2" />

          <div className="grid">
            <ProfileInfoItem
              label="Nombre de Usuario"
              value={usuario.NombreUsuario}
              icon="pi pi-at"
            />
            <ProfileInfoItem
              label="Correo electrónico"
              value={usuario.Email}
              icon="pi pi-envelope"
              extra={
                usuario.Verificado === 1 && (
                  <Tag severity="success" icon="pi pi-check" className="ml-2 py-1" />
                )
              }
            />
          </div>
        </div>

        {/* Si hay empleado, se muestran las secciones adicionales */}
        {empleado && (
          <>
            {/* Información básica */}
            <div className="p-4 mb-2">
              <div className="flex align-items-center mb-3">
                <i className="pi pi-address-book mr-2 text-green-600"></i>
                <h2 className="text-lg font-semibold text-gray-700 m-0">
                  Información Básica
                </h2>
              </div>

              <Divider className="my-2" />

              <div className="grid">
                <ProfileInfoItem
                  label="Nombre completo"
                  value={`${empleado.Nombres} ${empleado.Apellidos}`}
                  icon="pi pi-user"
                />
                <ProfileInfoItem
                  label="Cédula"
                  value={empleado.Cedula}
                  icon="pi pi-id-card"
                />
                <ProfileInfoItem
                  label="Fecha de nacimiento"
                  value={
                    empleado.FechaNacimiento
                      ? new Date(empleado.FechaNacimiento).toLocaleDateString()
                      : '—'
                  }
                  icon="pi pi-calendar"
                />
                <ProfileInfoItem
                  label="Nacionalidad"
                  value={empleado.Nacionalidad}
                  icon="pi pi-globe"
                />
              </div>
            </div>

            {/* Información de Contacto */}
            <div className="p-4 mb-2">
              <div className="flex align-items-center mb-3">
                <i className="pi pi-phone mr-2 text-blue-500"></i>
                <h2 className="text-lg font-semibold text-gray-700 m-0">
                  Información de Contacto
                </h2>
              </div>

              <Divider className="my-2" />

              <div className="grid">
                <ProfileInfoItem
                  label="Teléfono"
                  value={empleado.Telefono}
                  icon="pi pi-phone"
                />
                <ProfileInfoItem
                  label="Dirección"
                  value={empleado.Direccion}
                  icon="pi pi-map-marker"
                />
              </div>
            </div>

            {/* Información Laboral */}
            <div className="p-4 mb-2">
              <div className="flex align-items-center mb-3">
                <i className="pi pi-briefcase mr-2 text-blue-500"></i>
                <h2 className="text-lg font-semibold text-gray-700 m-0">
                  Información Laboral
                </h2>
              </div>

              <Divider className="my-2" />

              <div className="grid">
                <ProfileInfoItem
                  label="Cargo"
                  value={empleado.CargoNombre}
                  icon="pi pi-briefcase"
                />
                <ProfileInfoItem
                  label="Departamento"
                  value={empleado.NombreDepartamento}
                  icon="pi pi-sitemap"
                />
                <ProfileInfoItem
                  label="Estado del Empleado"
                  value={empleado.NombreEstado}
                  icon="pi pi-info-circle"
                />
                <ProfileInfoItem
                  label="Fecha de Contratación"
                  value={
                    empleado.FechaContratacion
                      ? new Date(empleado.FechaContratacion).toLocaleDateString()
                      : '—'
                  }
                  icon="pi pi-calendar-plus"
                />
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

// Componente auxiliar para mostrar etiqueta y valor
const ProfileInfoItem: React.FC<{
  label: string;
  value: string;
  icon?: string;
  extra?: React.ReactNode;
}> = ({ label, value, icon, extra }) => (
  <div className="col-12 mb-3">
    <div className="flex align-items-center">
      {icon && <i className={`${icon} mr-2 text-gray-500`}></i>}
      <div>
        <p className="text-sm text-gray-500 mb-1">{label}</p>
        <div className="flex align-items-center">
          <p className="font-medium text-gray-900 m-0">{value ?? '—'}</p>
          {extra}
        </div>
      </div>
    </div>
  </div>
);

export default PerfilUsuario;

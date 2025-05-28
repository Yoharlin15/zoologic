export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("token");
  // Aquí podrías hacer validaciones extra, por ejemplo si el token no está expirado
  return Boolean(token);
};

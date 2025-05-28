import { useMutation } from '@tanstack/react-query';
import {
  registrarUsuario,
  loginUsuario,
  confirmarCorreo,
  logoutUsuario,
} from "../../api/usuarios-api";

export const useRegistrarUsuario = () =>
  useMutation({
    mutationFn: registrarUsuario,
  });

export const useLoginUsuario = () =>
  useMutation({
    mutationFn: loginUsuario,
    onSuccess: (response) => {
      const token = response.TokenJwt; // ajusta según tu backend
      localStorage.setItem('token', token!); // o usa sessionStorage si prefieres
    },
  });


export const useConfirmarCorreo = () =>
  useMutation({
    mutationFn: confirmarCorreo,
  });

// export const useLogoutUsuario = () =>
//   useMutation({
//     mutationFn: logoutUsuario,
//   });


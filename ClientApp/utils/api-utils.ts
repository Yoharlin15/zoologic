import { select } from "radash";

const LocaleApiError = [
  {
    keys: ["network"],
    message: "Hubo un error al conectar con el servidor.",
  },
  {
    keys: ["timeout"],
    message:
      "Tiempo de espera agotado. Por favor, inténtalo nuevamente más tarde.",
  },
  {
    keys: ["user"],
    message: "Hubo un error con el usuario.",
  },
];

export const getApiMessageError = (error: string): string[] => {
  const lowercaseError = error.toLowerCase();

  return select(
    LocaleApiError,
    (item) => {
      return item.message;
    },
    (item) => item.keys.every((key) => lowercaseError.includes(key)),
  );
};

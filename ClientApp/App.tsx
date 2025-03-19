import { QueryClientProvider } from "@tanstack/react-query";
import { RouterContextProvider } from './contexts/router-context';
import queryClient from "./query.config";

import { locale, addLocale } from 'primereact/api';
addLocale('es', {
    firstDayOfWeek: 1,
    dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
    dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
    monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
    monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
    today: 'Hoy',
    clear: 'Limpiar', // Aquí agregas la traducción para el botón "clear"
    // Agrega más traducciones si es necesario
  });
  
  locale('es');

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
        <RouterContextProvider/>
        </QueryClientProvider>
    );
};

export default App;

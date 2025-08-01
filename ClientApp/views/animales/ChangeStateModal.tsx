import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { IEstados } from "#interfaces"; // Asegúrate de que la interfaz IEstados esté definida correctamente
import { useFetchEstados } from "ClientApp/hooks/useFetch";
import { Dialog } from "primereact/dialog";

interface ChangeStateModalProps {
    visible: boolean;
    animalId: number | undefined;
    onHide: () => void;
    onStateChange: (animalId: number, newState: string) => void;
}

const ChangeStateModal: React.FC<ChangeStateModalProps> = ({
    visible,
    animalId,
    onHide,
    onStateChange,
}) => {
    const { data: estados, isPending, isError } = useFetchEstados(); // Usamos el hook para obtener los estados disponibles
    const [selectedState, setSelectedState] = useState<string>("");

    // Manejamos el caso en que no haya estados o haya error
    useEffect(() => {
        if (!visible) {
            setSelectedState(""); // Reset estado cuando el modal se cierra
        }
    }, [visible]);

    const handleStateChange = () => {
        if (animalId && selectedState) {
            onStateChange(animalId, selectedState); // Llamamos la función para cambiar el estado
            onHide();
        }
    };

    if (isPending) return <div>Loading...</div>;
    if (isError) return <div>Error al cargar los estados</div>;

    // Convertimos los datos de estado a un formato que pueda ser usado en el Dropdown
    const estadoOptions = estados?.map((estado: IEstados) => ({
        label: estado.NombreEstado,  // Asegúrate de que 'nombre' esté bien definido en tu interfaz IEstados
        value: estado.EstadoId,      // Asegúrate de que 'id' esté bien definido en tu interfaz IEstados
    }));

    return (
        <Dialog
            visible={visible}
            onHide={onHide}
            header="Cambiar Estado del Animal"
            footer={
                <div className="p-d-flex p-jc-between">
                    <Button label="Cancelar" onClick={onHide} className="p-button-secondary" />
                    <Button label="Guardar" onClick={handleStateChange} />
                </div>
            }
            style={{ width: '40vw' }}  // Aumenta el tamaño del modal (50% del ancho de la ventana)
        >
            <div className="p-fluid">
                <div className="p-field">
                    <label htmlFor="state">Selecciona un estado</label>
                    <Dropdown
                        id="state"
                        value={selectedState}
                        options={estadoOptions}
                        onChange={(e) => setSelectedState(e.value)}
                        placeholder="Seleccione un estado"
                    />
                </div>
            </div>
        </Dialog>

    );
};

export default ChangeStateModal;

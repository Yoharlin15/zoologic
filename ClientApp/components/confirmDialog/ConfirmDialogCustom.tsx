import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import React from "react";

interface ConfirmDialogCustomProps {
  visible: boolean;
  message: string;
  header?: string;
  icon?: string;
  confirmLabel?: string;
  confirmClassName?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialogCustom: React.FC<ConfirmDialogCustomProps> = ({
  visible,
  message,
  header = "¿Estás seguro?",
  icon = "pi pi-exclamation-triangle",
  confirmLabel = "Confirmar",
  confirmClassName = "p-button-danger",
  onConfirm,
  onCancel,
}) => {
  return (
    <Dialog
      visible={visible}
      onHide={onCancel}
      header={header}
      modal
      style={{ width: "400px" }}
      footer={
        <>
          <Button
            label="Cancelar"
            icon="pi pi-times"
            className="p-button-text"
            onClick={onCancel}
          />
          <Button
            label={confirmLabel}
            icon="pi pi-check"
            className={confirmClassName}
            onClick={onConfirm}
          />
        </>
      }
    >
      <div className="flex align-items-center gap-3">
        <i className={`${icon} text-2xl`} />
        <span>{message}</span>
      </div>
    </Dialog>
  );
};

export default ConfirmDialogCustom;

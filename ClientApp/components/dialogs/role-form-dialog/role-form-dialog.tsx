import { Dialog } from "primereact/dialog";

interface IRoleDialogProps {
  id: number;
  visible: boolean;
  onHide: () => void;
}

const RoleDialog = ({ id, onHide, visible }: IRoleDialogProps) => {
  return (
    <Dialog
      modal
      closable={true}
      onHide={onHide}
      visible={visible}
      header="NombreRol"
      className="w-11 md:w-10 lg:w-8 xl:w-6"
    >
      <>klk</>
    </Dialog>
  );
};

export default RoleDialog;

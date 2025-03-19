import { Image } from "primereact/image";
const EmptyMessage = ({
  message,
  description,
}: {
  message: string;
  description?: string;
}) => {
  return (
    <div className="flex justify-content-center align-items-center h-full flex-column gap-2 w-full py-5">
      <Image
        width="228px"
        alt="no data"
        src="/svgs/undraw_no_data_re_kwbl.svg"
      />
      <h1 className="text-700 font-medium text-center m-0">{message}</h1>
      <p className="text-600 text-sm text-center max-w-md m-0">{description}</p>
    </div>
  );
};

export default EmptyMessage;

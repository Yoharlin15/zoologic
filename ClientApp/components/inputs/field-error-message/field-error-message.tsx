const FieldErrorMessage = ({ message }: { message?: string }) => {
  return <p className="text-red-500 mt-1 mb-0">{message}</p>;
};

export default FieldErrorMessage;

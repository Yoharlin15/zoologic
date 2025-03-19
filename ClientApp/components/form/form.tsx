import React from "react";

interface FormProps {
  onSubmit?: (e?: React.BaseSyntheticEvent) => void | Promise<void>;
  children: React.ReactNode;
}

const Form: React.FC<FormProps> = ({ onSubmit, children }) => {
  return (
    <form className="grid formgrid p-fluid" onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default Form;

import React from "react";
import { InputText } from "primereact/inputtext";
import { Control, useController, UseControllerProps } from "react-hook-form";
import { FieldErrorMessage } from "../field-error-message";

// Define the props for InputText (excluding 'name' and 'defaultValue')
type InputTextProps = Omit<React.ComponentProps<typeof InputText>, "name" | "defaultValue">;

// Define the props for the controlled input
interface IControlledInputTextProps extends InputTextProps, UseControllerProps {
  
  defaultValue?: string; // Explicitly define defaultValue as string
}

const ControlledInputText = ({
  name,
  rules,
  type = "text",
  defaultValue = "",
  ...restProps
}: IControlledInputTextProps) => {
  const { field, fieldState } = useController({
    name,
    rules,
    defaultValue, // Pass defaultValue to useController
  });

  return (
    <div>
      <InputText
        id={name}
        type={type}
        {...field}
        {...restProps}
        invalid={!!fieldState.error}
      />
      <FieldErrorMessage message={fieldState.error?.message} />
    </div>
  );
};

export default ControlledInputText;
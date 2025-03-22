import React from "react";
import { InputText } from "primereact/inputtext";
import { useController, UseControllerProps, Control } from "react-hook-form";
import { FieldErrorMessage } from "../field-error-message";

// Define the props for InputText (excluding 'name' and 'defaultValue')
type InputTextProps = Omit<React.ComponentProps<typeof InputText>, "name" | "defaultValue">;

// Define the props for the controlled input
interface IControlledInputTextProps extends InputTextProps, UseControllerProps {
  
  defaultValue?: string; // Explicitly define defaultValue as string
  control: Control<any>;
}

const ControlledInputText = ({
  name,
  rules,
  control,
  type = "text",
  defaultValue = "",
  ...restProps
}: IControlledInputTextProps) => {
  const { field, fieldState } = useController({
    name,
    rules,
    control,
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
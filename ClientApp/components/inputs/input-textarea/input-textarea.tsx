import React from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { Control, useController, UseControllerProps } from "react-hook-form";

import { FieldErrorMessage } from "../field-error-message";

type IInputTextAreaProps = React.ComponentProps<typeof InputTextarea> &
  UseControllerProps;

interface IControlledInputTextAreaProps
  extends Omit<IInputTextAreaProps, "id"> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
}

const ControlledInputTextArea = ({
  name,
  rules,
  control,
  ...restProps
}: IControlledInputTextAreaProps) => {
  const { field, fieldState } = useController({
    name,
    rules,
    control,
  });

  return (
    <div>
      <InputTextarea
        {...field}
        id={name}
        {...restProps}
        invalid={!!fieldState.error}
      />
      <FieldErrorMessage message={fieldState.error?.message} />
    </div>
  );
};

export default ControlledInputTextArea;

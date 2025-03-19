import React from "react";
import { InputMask } from "primereact/inputmask";
import { Control, useController, UseControllerProps } from "react-hook-form";

import { FieldErrorMessage } from "../field-error-message";

type IInputMaskProps = React.ComponentProps<typeof InputMask> &
  UseControllerProps;

interface IControlledInputMaskProps extends Omit<IInputMaskProps, "id"> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
}

const ControlledInputMask = ({
  name,
  rules,
  control,
  ...restProps
}: IControlledInputMaskProps) => {
  const { field, fieldState } = useController({
    name,
    rules,
    control,
  });

  return (
    <div>
      <InputMask
        id={name}
        {...field}
        {...restProps}
        invalid={!!fieldState.error}
      />
      <FieldErrorMessage message={fieldState.error?.message} />
    </div>
  );
};

export default ControlledInputMask;

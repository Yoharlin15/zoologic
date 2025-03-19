import React from "react";
import { omit } from "radash";
import { InputNumber } from "primereact/inputnumber";
import { Control, useController, UseControllerProps } from "react-hook-form";

import { FieldErrorMessage } from "../field-error-message";

type IInputNumberProps = React.ComponentProps<typeof InputNumber> &
  UseControllerProps;

interface IControlledInputNumberProps extends Omit<IInputNumberProps, "id"> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
}

const ControlledInputNumber = ({
  name,
  rules,
  control,
  ...restProps
}: IControlledInputNumberProps) => {
  const { field, fieldState } = useController({
    name,
    rules,
    control,
  });
  return (
    <div>
      <InputNumber
        id={name}
        inputId={name}
        onChange={(event) => field.onChange(event.value)}
        {...restProps}
        {...omit(field, ["onChange"])}
        invalid={!!fieldState.error}
      />
      <FieldErrorMessage message={fieldState.error?.message} />
    </div>
  );
};

export default ControlledInputNumber;

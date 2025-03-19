import React from "react";
import { InputOtp, InputOtpChangeEvent } from "primereact/inputotp";
import { Control, useController, UseControllerProps } from "react-hook-form";

import { FieldErrorMessage } from "../field-error-message";

type IInputOtpProps = React.ComponentProps<typeof InputOtp> &
  UseControllerProps;

interface IControlledInputOtpProps extends Omit<IInputOtpProps, "id"> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  showFieldErrorMessage?: boolean;
}

const ControlledInputOtp = ({
  name,
  rules,
  control,
  showFieldErrorMessage = true,
  ...restProps
}: IControlledInputOtpProps) => {
  const { field, fieldState } = useController({
    name,
    rules,
    control,
  });

  return (
    <div>
      <InputOtp
        {...field}
        {...restProps}
        id={name}
        invalid={!!fieldState.error}
        onChange={(e: InputOtpChangeEvent) => field.onChange(e.value)}
      />
      {showFieldErrorMessage && (
        <FieldErrorMessage message={fieldState.error?.message} />
      )}
    </div>
  );
};

export default ControlledInputOtp;

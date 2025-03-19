import clsx from "clsx";
import React from "react";
import { InputSwitch } from "primereact/inputswitch";
import { Control, useController, UseControllerProps } from "react-hook-form";

type IInputSwitchProps = React.ComponentProps<typeof InputSwitch> &
  UseControllerProps;

interface IControlledInputSwitchProps
  extends Omit<IInputSwitchProps, "id" | "checked"> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
}

const ControlledInputSwitch = ({
  name,
  rules,
  control,
  ...restProps
}: IControlledInputSwitchProps) => {
  const { field, fieldState } = useController({
    name,
    rules,
    control,
  });

  const errorClassName = fieldState.error?.message ? "p-invalid" : "";

  return (
    <InputSwitch
      {...field}
      id={name}
      {...restProps}
      checked={field.value}
      invalid={!!fieldState.error}
      className={clsx(errorClassName, restProps.className)}
    />
  );
};

export default ControlledInputSwitch;

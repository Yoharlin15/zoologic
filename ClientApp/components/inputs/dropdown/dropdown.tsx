import React from "react";
import { Dropdown } from "primereact/dropdown";
import { Control, useController, UseControllerProps } from "react-hook-form";

import { FieldErrorMessage } from "../field-error-message";

type IDropdownProps = React.ComponentProps<typeof Dropdown> &
  UseControllerProps;

interface IControlledDropdownProps extends Omit<IDropdownProps, "id"> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
}

const ControlledDropdown = ({
  name,
  rules,
  control,
  ...restProps
}: IControlledDropdownProps) => {
  const { field, fieldState } = useController({
    name,
    rules,
    control,
  });

  return (
    <div>
      <Dropdown
        {...restProps}
        {...field}
        id={name}
        onChange={field.onChange}
        invalid={!!fieldState.error}
        optionLabel={restProps.optionLabel ? restProps.optionLabel : "label"}
      />
      <FieldErrorMessage message={fieldState.error?.message} />
    </div>
  );
};

export default ControlledDropdown;

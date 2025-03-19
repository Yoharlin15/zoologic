import React from "react";
import { MultiSelect } from "primereact/multiselect";
import { Control, useController, UseControllerProps } from "react-hook-form";

import { FieldErrorMessage } from "../field-error-message";

type IMultiSelectProps = React.ComponentProps<typeof MultiSelect> &
  UseControllerProps;

interface IControlledMultiSelectProps extends Omit<IMultiSelectProps, "id"> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
}

const ControlledMultiSelect = ({
  name,
  rules,
  control,
  ...restProps
}: IControlledMultiSelectProps) => {
  const { field, fieldState } = useController({
    name,
    rules,
    control,
  });

  return (
    <div>
      <MultiSelect
        {...restProps}
        {...field}
        id={name}
        optionLabel="label"
        onChange={field.onChange}
        invalid={!!fieldState.error}
      />
      <FieldErrorMessage message={fieldState.error?.message} />
    </div>
  );
};

export default ControlledMultiSelect;

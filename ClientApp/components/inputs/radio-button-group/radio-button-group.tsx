import React from "react";
import { RadioButton, RadioButtonChangeEvent } from "primereact/radiobutton";
import { Control, useController, UseControllerProps } from "react-hook-form";

import { RadioGroupContainer } from "./container";

type IRadioButtonGroupProps = React.ComponentProps<typeof RadioButton> &
  UseControllerProps;

interface IControlledRadioButtonGroupProps
  extends Omit<IRadioButtonGroupProps, "id"> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  options: { label: string; value: string | number }[];
}

const ControlledRadioButtonGroup = ({
  name,
  rules,
  control,
  options,
  ...restProps
}: IControlledRadioButtonGroupProps) => {
  const { field, fieldState } = useController({
    name,
    rules,
    control,
  });

  return (
    <RadioGroupContainer>
      {options.map((option, index) => (
        <div key={index} className="flex align-items-center">
          <RadioButton
            {...field}
            value={option.value}
            inputId={`${option.value}`}
            checked={field.value === option.value}
            onChange={(e: RadioButtonChangeEvent) => field.onChange(e.value)}
            {...restProps}
            invalid={!!fieldState.error}
          />
          <label className="ml-2" htmlFor={`${option.value}`}>
            {option.label}
          </label>
        </div>
      ))}
      {fieldState.error && (
        <p className="text-red-500 -mt-2">{fieldState.error.message}</p>
      )}
    </RadioGroupContainer>
  );
};

export default ControlledRadioButtonGroup;

import { omit } from "radash";
import { Calendar, CalendarProps } from "primereact/calendar";
import { Control, useController, UseControllerProps } from "react-hook-form";

import { FieldErrorMessage } from "../field-error-message";

type ICalendarProps = CalendarProps & UseControllerProps;

interface IControlledCalendarProps extends Omit<ICalendarProps, "id"> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
}

const ControlledCalendar = ({
  name,
  rules,
  control,
  ...restProps
}: IControlledCalendarProps) => {
  const { field, fieldState } = useController({
    name,
    rules,
    control,
  });

  return (
    <div>
      <Calendar
        id={name}
        onChange={field.onChange}
        {...omit(field, ["onChange"])}
        {...(restProps as CalendarProps)}
        invalid={!!fieldState.error}
      />
      <FieldErrorMessage message={fieldState.error?.message} />
    </div>
  );
};

export default ControlledCalendar;

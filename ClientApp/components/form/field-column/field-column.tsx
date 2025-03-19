import clsx from "clsx";
import React from "react";
import { isNumber } from "radash";

type ColSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

type Columns = {
  sm?: ColSpan;
  md?: ColSpan;
  lg?: ColSpan;
  xl?: ColSpan;
  "2xl"?: ColSpan;
};

const getColumnClass = (col: ColSpan | Columns): string => {
  if (typeof col === "number") {
    if (col < 1 || col > 12) {
      console.error(
        `Invalid 'col' value: ${col}. Accepted values are between 1 and 12.`,
      );
      return "";
    }
    return `col-${col}`;
  } else {
    const classes = [];
    for (const breakpoint in col) {
      if (
        Object.prototype.hasOwnProperty.call(col, breakpoint) &&
        typeof col[breakpoint as keyof Columns] === "number"
      ) {
        const columnValue = col[breakpoint as keyof Columns];
        if (typeof columnValue !== "undefined") {
          const columnSize = Math.max(1, Math.floor(columnValue));
          classes.push(`${breakpoint}:col-${columnSize}`);
        }
      }
    }

    return classes.join(" ");
  }
};

interface FieldColumnProps {
  help?: string;
  label?: string;
  /** Number of columns to occupy. Use either a number between 1 and 12, or specify column sizes for different screen breakpoints using the Columns type */
  columns?: Columns | ColSpan;
  inputContainerClassName?: string;
}

const FieldColumn = ({
  help,
  label,
  children,
  columns = 12,
  inputContainerClassName,
}: React.PropsWithChildren<FieldColumnProps>) => {
  // Ensure children is a valid React element with id prop
  const { name } =
    (children && React.isValidElement(children) && children.props) ?? {};

  if (!name) {
    console.error(
      "FieldColumn must have a single child element with an id prop.",
    );
    return null;
  }
  const helpId = help ? `${name}-help` : undefined;
  const columnClasses = getColumnClass(columns);
  const baseClass = isNumber(columns)
    ? `col-${columns} field mb-2`
    : "col-12 field mb-2";

  let childElement = children;

  if (React.isValidElement(children)) {
    childElement = React.cloneElement(children, {
      ...(children.props || {}),
      "aria-describedby": helpId,
    });
  }

  return (
    <div className={clsx(baseClass, columnClasses)}>
      {!!label && (
        <label
          htmlFor={name}
          className="font-medium text-900 white-space-nowrap flex align-items-center"
        >
          {label}
        </label>
      )}
      <div className={inputContainerClassName}>{childElement}</div>
      {!!help && (
        <small id={helpId} className="text-500">
          {help}
        </small>
      )}
    </div>
  );
};

export default FieldColumn;

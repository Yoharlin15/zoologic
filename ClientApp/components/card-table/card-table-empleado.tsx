import clsx from "clsx";
import React from "react";
import { Skeleton } from "primereact/skeleton";
import { DataTable, DataTableProps } from "primereact/datatable";
import { InputText, InputTextProps } from "primereact/inputtext";
import { Column, ColumnProps as ColumnPropsPrimeReact } from "primereact/column";

type ColumnProps<T> = ColumnPropsPrimeReact & {
  field?: keyof T;
};

export interface ICardTableEmpleadoProps<TB extends object> {
  className?: string;
  hideSearch?: boolean;
  title: React.ReactNode;
  skeletonLoading?: boolean;
  subTitle?: React.ReactNode;
  placeholderSearch?: string;
  columns: ColumnProps<TB>[];
  value: DataTableProps<TB[]>["value"];
  renderContent?: () => React.ReactNode;
  renderHeadActions?: React.JSX.Element[];
  onChangeSearch?: InputTextProps["onChange"];
  tableProps?: Omit<DataTableProps<TB[]>, "value" | "children">;
}

const CardTableEmpleado = <TB extends object>({
  title,
  value,
  columns,
  subTitle,
  hideSearch,
  tableProps,
  renderContent,
  className = "",
  onChangeSearch,
  skeletonLoading,
  renderHeadActions,
  placeholderSearch = "Búsqueda",
}: ICardTableEmpleadoProps<TB>) => {
  const renderDataTableComponent = React.useCallback(() => {
    if (skeletonLoading) {
      const skeletonRows = tableProps?.rows ?? 8;
      return (
        <DataTable
          style={{ minHeight: 300 }}
          className="p-datatable-striped"
          value={Array(skeletonRows).fill(null)}
        >
          {columns.map((column) => (
            <Column key={column.field} body={<Skeleton />} {...column} />
          ))}
        </DataTable>
      );
    }

    return (
      <DataTable
        value={value}
        {...(tableProps as DataTableProps<TB[]>)}
        className="custom-datatable"
        paginatorClassName={clsx(tableProps?.paginatorClassName, "border-none")}
      >
        {columns.map((column) => (
          <Column key={column.field} {...column} />
        ))}
      </DataTable>
    );
  }, [columns, skeletonLoading, tableProps, value]);

  const buttons = React.useMemo(() => {
    return (renderHeadActions ?? []).map((button) => button);
  }, [renderHeadActions]);

  const header = (
    <div className="flex flex-column sm:flex-row gap-2 flex-wrap align-items-center justify-content-between gap-2">
      <div className="flex flex-column">
        <span>{title}</span>
        <span className="text-lg font-medium text-600">{subTitle}</span>
      </div>
      <div className="flex gap-2 flex-wrap justify-content-center sm:justify-content-end">
        {!hideSearch && (
          <span className="p-input-icon-left">
            <InputText
              type="text"
              onChange={onChangeSearch}
              style={{ height: "100%" }}
              placeholder={placeholderSearch}
              className="surface-section text-600 w-full pl-5"
            />
          </span>
        )}
        {buttons}
      </div>
    </div>
  );

  return (
    <Card header={header} className={className}>
      {renderContent ? renderContent() : renderDataTableComponent()}
    </Card>
  );
};

const Card = ({
  header,
  children,
  className,
}: React.PropsWithChildren<{ header: React.ReactNode; className: string }>) => (
  <div
    className={clsx(
      "bg-white h-full text-gray-700 shadow-md rounded-md",
      "dark:bg-gray-900 dark:text-white",
      className,
    )}
  >
    <div className="text-2xl font-bold mb-2 p-3">{header}</div>
    {children}
  </div>
);

export default CardTableEmpleado;

// Añade estos estilos en tu archivo CSS
const styles = `
  .custom-datatable .p-datatable-thead > tr > th {
    background-color: #e8f5e9; /* Verde claro */
    border: 1px solid #c8e6c9; /* Borde entre columnas */
  }

  .custom-datatable .p-datatable-tbody > tr > td {
    border: 1px solid #c8e6c9; /* Borde entre columnas */
  }
`;

// Inyecta los estilos en el documento
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
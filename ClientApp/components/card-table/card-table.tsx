import clsx from "clsx";
import React from "react";
import { Skeleton } from "primereact/skeleton";
import { DataTable, DataTableProps } from "primereact/datatable";
import { InputText, InputTextProps } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import {
  Column,
  ColumnProps as ColumnPropsPrimeReact,
} from "primereact/column";

type ColumnProps<T> = ColumnPropsPrimeReact & {
  field?: keyof T;
};

export interface ICardTableProps<TB extends object> {
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
  headerEndContent?: React.ReactNode;
}

const CardTable = <TB extends object>({
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
  headerEndContent,
  placeholderSearch = "Buscar",
}: ICardTableProps<TB>) => {
  const renderDataTableComponent = React.useCallback(() => {
    if (skeletonLoading) {
      const skeletonRows = tableProps?.rows ?? 6;
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
      <>
        <DataTable
          value={value}
          paginator
          
          rowsPerPageOptions={[5, 7]}
          className="border-1 border-gray-200 rounded-lg overflow-hidden"
          {...(tableProps as DataTableProps<TB[]>)}
          rows={7}
          paginatorClassName={clsx(tableProps?.paginatorClassName, "border-none")}
        >
          {columns.map((column) => (
            <Column
              key={column.field}
              {...column}
              filter={false}
              headerClassName="border border-gray-200"
              bodyClassName="border border-gray-200"
            />
          ))}
        </DataTable>
        <div className="text-right text-sm text-gray-600 mt-2 px-2">
          Total de registros: <strong>{value?.length ?? 0}</strong>
        </div>
      </>
    );
  }, [columns, skeletonLoading, tableProps, value]);

  const buttons = React.useMemo(() => renderHeadActions ?? [], [renderHeadActions]);

  const header = (
    <div className="flex flex-column sm:flex-row gap-2 flex-wrap align-items-center justify-content-between">
      <div className="flex flex-column">
        <span>{title}</span>
        <span className="text-lg font-medium text-600">{subTitle}</span>
      </div>
      <div className="flex gap-2 flex-wrap justify-content-center sm:justify-content-end">
        {!hideSearch && (
          <IconField iconPosition="left">
            <InputIcon className="pi pi-search" />
            <InputText
              type="text"
              onChange={onChangeSearch}
              placeholder={placeholderSearch}
              className="surface-section text-600 w-full"
              style={{ height: "100%" }}
            />
          </IconField>
        )}
        {headerEndContent}
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
    <div className="text-2xl font-bold mb-0 p-2">{header}</div>
    <div className="p-2">{children}</div>
  </div>
);

export default CardTable;

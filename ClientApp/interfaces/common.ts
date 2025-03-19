import React from "react";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { Message, ValidationRule } from "react-hook-form";

export interface Api<T> {
  getAll: () => Promise<T[]>;
  // getById: (id: number) => Promise<T>;
  // create?: (newData: T) => Promise<T>;
  // delete?: (id: number) => Promise<void>;
  // update?: (data: Partial<T>) => Promise<T>;
}

export type StatusType = "Activo" | "Anulado";

export type IdeaStageType =
  | string
  | "Borrador"
  | "Publicado"
  | "En prueba"
  | "Nueva idea"
  | "En proceso"
  | "Planificado";

export type TaskStageType =
  | string
  | "Test"
  | "Revisión"
  | "Realizando"
  | "Completada"
  | "Para realizar"
  | "Próximas versiones (V2)";

export type Severity = "info" | "danger" | "warning" | "success";

export interface ILogin {
  Code: string;
  Email: string;
}

export interface ISidebarProps {
  id: number;
  visible: boolean;
  onHide: () => void;
}
export interface IAudit {
  CreadoPor: number;
  FechaCreacion: Date;
  ModificadoPor?: number;
  FechaModificacion?: Date;
}

export type StatType = { Label: string; Value: number };

export type OptionType = {
  label: string;
  value: string;
};

export interface IMenuProps {
  menuItems: MenuItem[];
  menuRef: React.RefObject<Menu>;
}

export type Validation = {
  min: ValidationRule<number | string>;
  max: ValidationRule<number | string>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validate: any;
  required: Message | ValidationRule<boolean>;
  pattern?: ValidationRule<RegExp>;
  maxLength: ValidationRule<number>;
  minLength: ValidationRule<number>;
};

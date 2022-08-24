/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction } from 'react';

export interface TableToolbarProps {
  numSelected: number;
  title: string;
  checkboxSelection: boolean;
}

export interface GenericTable {
  tableStyle: object;
  isEditable: boolean;
  isDeleted: boolean;
  title: string;
  rows: Array<any>;
  checkboxSelection: boolean;
  page: number;
  rowsPerPage: number;
  setPage: Dispatch<SetStateAction<number>>;
  setRowsPerPage: Dispatch<SetStateAction<number>>;
  count: number;
  onEdit?: () => void;
  onDelete?: () => void;
}

export interface TableHeaderProps {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
  isEditable: boolean;
  checkboxSelection: boolean;
  isDeleted: boolean;
  rows: any;
}

export interface TableBody {
  rows: any;
  handleTableRowClick: (event: React.MouseEvent<unknown>, name: string) => void;
  isSelected: (name: string) => boolean;
  isEditable: boolean;
  isDeleted: boolean;
  checkboxSelection: boolean;
  onEdit: any;
  onDelete: any;
}

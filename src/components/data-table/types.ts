import { ReactElement } from 'react';

export type ColumnDefinition = {
  id: string;
  alignRight?: boolean;
  displayName?: string | ReactElement<any>;
  size?: number;
  renderCell?: (item: any) => JSX.Element;
};

export type TableProps = {
  data: any[];
  columns: ColumnDefinition[];
  isBordered?: boolean;
  rowKey?: string;
  minHeight?: number;
};

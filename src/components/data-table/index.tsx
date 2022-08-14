/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';

import { TableProps } from './types';
import { TableComponent, BorderedTable } from './table-components';

type State = {
  data: any[];
};

export const DataTable = ({
  data,
  columns,
  isBordered,
  rowKey = 'id',
  minHeight
}: TableProps) => {
  const [state, setState] = React.useState<State>({ data });

  React.useEffect(() => {
    if ((state?.data !== data || state.data?.length !== data.length) && data) setState({ ...state, data });
  }, [data]);

  const renderHeader = () => {
    return (
      <TableComponent.Header>
        {columns.map((column, index) => (
          <TableComponent.HeaderCell
            data-testid={`table-column-title-${index}`}
            key={index}
            name={column.displayName}
            size={column.size}
            alignRight={column.alignRight}
          />
        ))}
      </TableComponent.Header>
    );
  };

  const renderRow = (item: any) => {
    if (!item) return;
    return (
      <TableComponent.Row key={item && item[rowKey]}>
        {columns &&
          columns.map((column, index) => (
            <TableComponent.Cell
              key={index}
              size={column.size}
              alignRight={column?.alignRight}
            >
              {column.renderCell && column.renderCell(item)}
            </TableComponent.Cell>
          ))}
      </TableComponent.Row>
    );
  };

  const renderBody = () => <TableComponent.Body>{state.data.map(renderRow)}</TableComponent.Body>;

  const renderTable = () => (
    <TableComponent style={{ minHeight }}>
      {renderHeader()}
      {Array.isArray(state.data) && renderBody()}
    </TableComponent>
  );

  const renderBorderTable = () => <BorderedTable>{renderTable()}</BorderedTable>;

  return isBordered ? renderBorderTable() : renderTable();
};

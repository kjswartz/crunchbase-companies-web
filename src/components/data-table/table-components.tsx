import * as React from 'react';
import { ReactElement } from 'react';
import styled from 'styled-components';

type TableCellProps = React.HTMLAttributes<HTMLDivElement | HTMLAnchorElement> & {
  alignRight?: boolean;
  href?: string;
  size?: number;
};

type TableHeaderCellProps = TableCellProps & {
  name?: string | ReactElement<any>;
  size?: number;
};
//////////////////////////////////////////////////////////////////////////////////////////////////////
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-collapse: collapse;
`;

const HeaderContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #dddddd;
  cursor: default;
`;

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;

  > * a:hover {
    color: #666666;
  }
`;

const RowContainer = styled.div`
  background: #ffffff;
  display: flex;
  cursor: ${props => (props.onClick ? 'pointer' : 'cursor')};

  &:nth-child(even) {
    background-color: #fafafa;
  }
`;

const CellContainer = styled.div<{ size?: number; alignRight?: boolean; isDisabled?: boolean }>`
  min-height: 45px;
  padding: 0 20px;
  color: #666666;
  letter-spacing: 0.025em;
  display: flex;
  align-items: center;
  flex: ${props => (typeof props.size === 'number' ? props.size : 1)};
  justify-content: ${props => (props.alignRight ? 'flex-end' : 'flex-start')};
`;

const CellContainerLink = styled.a<{ size?: number; alignRight?: boolean; isDisabled?: boolean }>`
  min-height: 45px;
  padding: 0 20px;
  color: #666666;
  letter-spacing: 0.025em;
  display: flex;
  align-items: center;
  flex: ${props => (props.size ? props.size : 1)};
  justify-content: ${props => (props.alignRight ? 'flex-end' : 'flex-start')};
`;

const HeaderCellContainer = styled(CellContainer)`
  text-transform: uppercase;
  letter-spacing: 0.045em;
  color: #000;
`;
//////////////////////////////////////////////////////////////////////////////////////////////////////
export const TableComponent: any = ({ children, ...rest }: React.HTMLAttributes<HTMLDivElement>) => (
  <Container {...rest}>{children}</Container>
);
//////////////////////////////////////////////////////////////////////////////////////////////////////
TableComponent.Header = ({ children, ...rest }: React.HTMLAttributes<HTMLDivElement>) => (
  <HeaderContainer {...rest}>{children}</HeaderContainer>
);
//////////////////////////////////////////////////////////////////////////////////////////////////////
TableComponent.Body = ({ children, ...rest }: React.HTMLAttributes<HTMLDivElement>) => (
  <BodyContainer {...rest}>{children}</BodyContainer>
);
//////////////////////////////////////////////////////////////////////////////////////////////////////
TableComponent.Row = ({ children, ...rest }: React.HTMLAttributes<HTMLDivElement>) => (
  <RowContainer {...rest}>{children}</RowContainer>
);
//////////////////////////////////////////////////////////////////////////////////////////////////////
TableComponent.HeaderCell = ({ name, alignRight, size, ...rest }: TableHeaderCellProps) => (
  <HeaderCellContainer {...rest} size={size} alignRight={alignRight}>
    {name}
  </HeaderCellContainer>
);
//////////////////////////////////////////////////////////////////////////////////////////////////////
TableComponent.Cell = ({ alignRight, onClick, href, size, ...rest }: TableCellProps) => {
  return !href ? (
    <CellContainer {...rest} onClick={onClick} size={size} alignRight={alignRight} />
  ) : (
    <CellContainerLink {...rest} href={href} size={size} alignRight={alignRight} />
  );
};
//////////////////////////////////////////////////////////////////////////////////////////////////////
export const BorderedTable = ({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>) => <div {...rest} />;

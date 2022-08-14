/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import styled from 'styled-components';

type Props = {
  totalItems: number;
  page: number;
  onChange?: ({ page }: any) => void;
  renderCurrentLabel?: ({ startLimit, endLimit }: { startLimit: number; endLimit: number }) => JSX.Element;
  previousDisplay?: string;
  nextDisplay?: string;
};

type PaginationButtonProps = {
  id: number;
  display: string;
  isCurrent?: boolean;
};

type ButtonState = {
  buttonList: any[];
  firstPageBtn: PaginationButtonProps;
  lastPageBtn: PaginationButtonProps;
  nextPageBtn: PaginationButtonProps;
  previousPageBtn: PaginationButtonProps;
};

type LimitDisplay = {
  startLimit: number;
  endLimit: number;
};

const LIMIT_PER_PAGE = 25;

export const Pagination = (props: Props) => {
  const getLimitDisplayValues = (): { startLimit: number; endLimit: number } => {
    const startLimit = props.totalItems ? (props.page * LIMIT_PER_PAGE) + 1 : 0;
    const endLimit =
      (props.page * LIMIT_PER_PAGE) + LIMIT_PER_PAGE < props.totalItems ? (props.page * LIMIT_PER_PAGE) + LIMIT_PER_PAGE : props.totalItems;

    return { startLimit, endLimit };
  };

  const buildButtonList = () => {
    const buildBtn = (page: number): any => {
      return {
        id: page,
        display: page.toString(),
        isCurrent: props.page === page
      };
    };

    // Create array for middle group nav btns
    const fillRange = (start: number, end: number) => {
      const length = end - start + 1;

      return Array(length)
        .fill({})
        .map((x, index) => {
          const page = start + index;
          //set ellipsis if gap between first and last pages and start and end ranges
          const display =
            (index === length - 1 && lastPage - end > 1) || (index === 0 && start - 1 > 1) ? '...' : page.toString();

          return { ...x, ...buildBtn(page), display };
        });
    };

    // Need to get the last page aka the page count. Exit method if only 1 page.
    const lastPage = Math.ceil(props.totalItems / LIMIT_PER_PAGE);
    if (lastPage < 2) return [];

    const currentPage = Math.ceil((props.page * LIMIT_PER_PAGE) / LIMIT_PER_PAGE + 1);

    // In order to keep current page centered the range of pagination links has to range between 5-7 btns.
    const getPageBtnRanges = (): { startRange: number; endRange: number } => {
      // 5 middle numbers
      if (currentPage < 4) {
        const endRange = 6 < lastPage ? 6 : lastPage - 1;
        return { startRange: 2, endRange };
      }

      // 6 middle numbers
      if (currentPage <= 5) {
        const endRange = currentPage + 3 < lastPage ? currentPage + 3 : lastPage - 1;
        return { startRange: 2, endRange };
      }

      // 7 middle numbers
      if (lastPage - currentPage > 3) {
        return { startRange: currentPage - 3, endRange: currentPage + 3 };
      }

      // 6 middle numbers
      if (currentPage + 2 < lastPage) {
        return { startRange: lastPage - 6, endRange: lastPage - 1 };
      }

      // 5 middle numbers
      return { startRange: lastPage - 5, endRange: lastPage - 1 };
    };

    const { startRange, endRange } = getPageBtnRanges();
    const btnList = fillRange(startRange, endRange);

    // Add anchor nav btns (first and last page)
    btnList.splice(0, 0, buildBtn(1));
    btnList.push(buildBtn(lastPage));

    return btnList;
  };

  const getBtnState = () => {
    const list = buildButtonList();

    return {
      buttonList: list.slice(1, -1),
      firstPageBtn: list.slice(0, 1)[0],
      lastPageBtn: list.slice(-1)[0],
      nextPageBtn: {
        id: props.page + 1,
        display: '>'
      },
      previousPageBtn: {
        id: props.page - 1,
        display: '<'
      }
    };
  };

  const renderButton = (btn: PaginationButtonProps) => {
    return (
      btn && (
        <Button
          key={btn.id}
          isCurrent={Boolean(btn.isCurrent)}
          data-testid={`pagination-button-${btn.id}`}
          onClick={e => handleClick(btn.id, e)}
          disabled={paginationDisabled}
        >
          {btn.display}
        </Button>
      )
    );
  };

  const handleClick = (page: number, e: React.MouseEvent<HTMLButtonElement>): void => {
    console.log('here')
    e.preventDefault();
    e.stopPropagation();
    if (props.onChange && page !== props.page) {
      console.log('here')
      console.log('page', page)
      setPaginationDisabled(false);
      props.onChange({ page });
    }
  };

  const [paginationDisabled, setPaginationDisabled] = React.useState<boolean>(false);
  const [limitDisplayValues, setLimitDisplayValues] = React.useState<LimitDisplay>(getLimitDisplayValues());
  const [buttonState, setButtonState] = React.useState<ButtonState>(getBtnState());

  React.useEffect(() => {
    setPaginationDisabled(false);
    setLimitDisplayValues(getLimitDisplayValues());
    setButtonState(getBtnState());
  }, [props.page]);

  React.useEffect(() => {
    setPaginationDisabled(false);
    setLimitDisplayValues(getLimitDisplayValues());
    setButtonState(getBtnState());
  }, [props.totalItems]);

  return (
    <Container>
        <Label>
          {props.renderCurrentLabel ? (
            props.renderCurrentLabel({
              startLimit: limitDisplayValues.startLimit,
              endLimit: limitDisplayValues.endLimit
            })
          ) : (
            <>
              Showing {limitDisplayValues.startLimit}-{limitDisplayValues.endLimit} of {props.totalItems} records
            </>
          )}
        </Label>

      <Container style={{ whiteSpace: 'nowrap' }}>
        {props.page > 1 && (
          <PreviousBtn
            onClick={e => handleClick(buttonState?.previousPageBtn?.id, e)}
            disabled={paginationDisabled}
          />
        )}

        {renderButton(buttonState.firstPageBtn)}

        {buttonState.buttonList.map(button => renderButton(button))}

        {renderButton(buttonState.lastPageBtn)}

        {limitDisplayValues.endLimit < props.totalItems && (
          <NextBtn
            onClick={e => handleClick(buttonState?.nextPageBtn?.id, e)}
            disabled={paginationDisabled}
          />
        )}
      </Container>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding-left: 10px;
`;

const Label = styled.p`
  color: #999999;
`;

const Button = styled.button<{ isCurrent?: boolean }>`
  background: ${({ isCurrent }) => (isCurrent ? '#F6F6F6' : '#FFFFFF')};
  color: ${({ isCurrent }) => (isCurrent ? '#444444' : '#666666')};
  border: none;
  border-radius: 25px;
  margin-right: 10px;
  width: 25px;
  height: 25px;

  &:first-of-type {
    margin-left: 8px;
  }

  &:focus {
    outline: none;
  }

  &:active {
    background: #ffffff;
    border-style: none;
  }
`;

const NextBtn = styled(Button)`
  color: #999999;
  width: 25px;
  height: 25px;
  &::before {
    content: '>';
    font-weight: 900;
  }
`;

const PreviousBtn = styled(Button)`
  color: #999999;
  width: 25px;
  height: 25px;
  &::before {
    content: '<';
    font-weight: 900;
  }
`;

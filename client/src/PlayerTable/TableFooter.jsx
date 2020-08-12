import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlayersSuccess } from '../appState/actions';
import { PAGE_SIZE } from '../constants';

// Added a footer for pagination
const TableFooter = () => {
  const dispatch = useDispatch();
  const getPageData = (state) => state.page;
  const pageData = useSelector(getPageData);

  async function fetchPlayers(page) {
    const response = await fetch(
      `http://localhost:3001/players?size=${PAGE_SIZE}&from=${page}`,
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    const json = await response.json();
    dispatch(fetchPlayersSuccess(json));
  }

  const prevPage = () => {
    if (pageData.from - PAGE_SIZE < 0) {
      return;
    }
    fetchPlayers(pageData.from - PAGE_SIZE);
  };
  const nextPage = () => {
    if (pageData.from + PAGE_SIZE >= pageData.total) {
      return;
    }
    fetchPlayers(pageData.from + 25);
  };
  return (
    <div className="table__footer">
      <div className="table__footer-right">
        <span role="button" onClick={prevPage} className="table--page-left" />
        <span>{`Page ${
          Math.floor(pageData.from / PAGE_SIZE) + 1
        } out of ${Math.ceil(pageData.total / PAGE_SIZE)}`}</span>
        <span role="button" onClick={nextPage} className="table--page-right" />
      </div>
    </div>
  );
};

export default TableFooter;

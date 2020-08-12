import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlayersSuccess } from '../appState/actions';
import PlayerTableModal from './PlayerTableModal/PlayerTableModal';
import { PAGE_SIZE } from '../constants';

const TableMenu = () => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const getPageDataFrom = (state) => state.page.from;
  const pageDataFrom = useSelector(getPageDataFrom);

  const addPlayerClick = (setWinnings, name, country, winnings, imageUrl) => {
    if(!document.getElementById("player-form").checkValidity()){
        return;
    }
    if (winnings === '') {
      setWinnings(0);
    }
    let data = {
      name,
      country,
      winnings: parseFloat(winnings),
    };
    if (imageUrl) {
      data.imageUrl = imageUrl;
    }
    (async function addPlayer() {
      const re = await fetch('http://localhost:3001/players', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log(re);

      const response = await fetch(
        `http://localhost:3001/players?size=${PAGE_SIZE}&from=${pageDataFrom}`,
        {
          headers: {
            Accept: 'application/json',
          },
        }
      );

      const json = await response.json();
      dispatch(fetchPlayersSuccess(json));
    })();
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div id="player-table-menu" className="table table--menu">
      <button className="table--button" onClick={handleOpen}>
        Create Player
      </button>
      <PlayerTableModal
        title="Create Player"
        open={open}
        setOpen={setOpen}
        submitFn={addPlayerClick}
      />
    </div>
  );
};

export default TableMenu;

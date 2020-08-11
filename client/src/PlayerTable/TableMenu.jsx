import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchPlayersSuccess } from '../appState/actions';
import PlayerTableModal from './PlayerTableModal/PlayerTableModal'

const TableMenu = () => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const addPlayerClick = (setWinnings, name, country, winnings, imageUrl) => {
    if (winnings === '') {
      setWinnings(0);
    }
    let data = {
      name,
      country,
      winnings: parseInt(winnings),
    };
    if (imageUrl) {
      data.imageUrl = imageUrl;
    }
    (async function addPlayer() {
      await fetch('http://localhost:3001/players', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const response = await fetch('http://localhost:3001/players?size=60', {
        headers: {
          Accept: 'application/json',
        },
      });

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
      <PlayerTableModal open={open} setOpen={setOpen} submitFn={addPlayerClick} />
    </div>
  );
};

export default TableMenu;

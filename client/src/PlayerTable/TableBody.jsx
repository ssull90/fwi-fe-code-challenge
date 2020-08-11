import React from 'react';
import PropTypes from 'prop-types';
import Flags from 'react-world-flags';

import Avatar from '../Avatar';
import { COUNTRIES } from '../constants';
import PlayerTableModal from './PlayerTableModal/PlayerTableModal';
import { useDispatch } from 'react-redux';
import { fetchPlayersSuccess } from '../appState/actions';
import Modal from '@material-ui/core/Modal';

const TableBody = ({ players }) => {
  const [name, setName] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [winnings, setWinnings] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');
  const [id, setId] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const dispatch = useDispatch();

  const editPlayerClick = (
    setWinnings,
    name,
    country,
    winnings,
    imageUrl,
    id
  ) => {
    if (winnings === '') {
      setWinnings(0);
    }
    let data = {
      name,
      country,
      winnings: parseInt(winnings),
      imageUrl,
    };
    (async function editPlayer() {
      await fetch(`http://localhost:3001/players/${id}`, {
        method: 'PATCH',
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

  const deletePlayerClick = (
    id
  ) => {
    (async function deletePlayer() {
      await fetch(`http://localhost:3001/players/${id}`, {
        method: 'DELETE',
      });

      const response = await fetch('http://localhost:3001/players?size=60', {
        headers: {
          Accept: 'application/json',
        },
      });

      const json = await response.json();
      dispatch(fetchPlayersSuccess(json));
    })();
    setDeleteOpen(false);
  };

  const closeDeleteModal = () => {
    setName('');
    setId('');
    setDeleteOpen(false);
  };

  const openDeleteModal = (e) => {
    const rowIndex = e.currentTarget.parentNode.parentNode.getAttribute(
      'data-key'
    );
    const currentRowData = players[rowIndex];
    setName(currentRowData.name);
    setId(currentRowData.id);
    setDeleteOpen(true);
  };

  const openEditModal = (e) => {
    const rowIndex = e.currentTarget.parentNode.parentNode.getAttribute(
      'data-key'
    );
    const currentRowData = players[rowIndex];
    setName(currentRowData.name);
    setCountry(currentRowData.country);
    setWinnings(currentRowData.winnings);
    setImageUrl(currentRowData.imageUrl);
    setId(currentRowData.id);
    setOpen(true);

  };

  return (
    <div>
      <table
        id="player-table-body"
        role="presentation"
        className="table table--body"
      >
        <tbody>
          {players.map(({ id, name, country, winnings, imageUrl }, index) => (
            <tr key={id} data-key={index} role="row" className="table__row">
              <td role="gridcell" className="table__avatar">
                <Avatar src={imageUrl} />
              </td>
              <td role="gridcell" className="table__player">
                {name}
              </td>
              <td role="gridcell" className="table__winnings">
                {winnings.toLocaleString(undefined, {
                  style: 'currency',
                  currency: 'USD',
                })}
              </td>
              <td role="gridcell" className="table__native">
                <div className="country">
                  <Avatar>
                    <Flags code={country} alt="" />
                  </Avatar>
                  {country}
                </div>
              </td>
              <td role="gridcell" className="table__control">
                <span
                  role="button"
                  className="table__pencil"
                  onClick={openEditModal}
                />
                <span role="button" className="table__delete" onClick={openDeleteModal} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <PlayerTableModal
        open={open}
        setOpen={setOpen}
        submitFn={editPlayerClick}
        nameParam={name}
        countryParam={country}
        winningsParam={winnings}
        imageUrlParam={imageUrl}
        idParam={id}
      />
      <Modal
        open={deleteOpen}
        onClose={closeDeleteModal}
        aria-labelledby="Add Player Modal"
        aria-describedby="Modal Form for adding a player"
      >
        <div className="modal-container">
          <div className="modal-container--header">
            <span className="modal-container--header-font">Create Player</span>
          </div>
          <div className="modal-container--body">
                <p>Are you sure you want to delete {name}?</p>
          </div>
          <div className="modal-container--footer">
            <input
              className="modal-container--button"
              type="reset"
              value="Cancel"
              onClick={closeDeleteModal}
            />
            <input
              className="modal-container--button"
              type="submit"
              value="Submit"
              onClick={() =>
                deletePlayerClick(id)
              }
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

TableBody.propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      country: PropTypes.oneOf(Object.keys(COUNTRIES)),
      winnings: PropTypes.number.isRequired,
      imageUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TableBody;

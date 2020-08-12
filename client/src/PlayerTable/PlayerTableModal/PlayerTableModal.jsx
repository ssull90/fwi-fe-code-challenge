import React, { useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import { COUNTRIES } from '../../constants';
import PropTypes from 'prop-types';
import './PlayerTableModal.scss';

const PlayerTableModal = ({
  title,
  open,
  setOpen,
  submitFn,
  nameParam = '',
  countryParam = 'US',
  winningsParam = '0',
  imageUrlParam = '',
  idParam = '',
}) => {
  const [name, setName] = React.useState(nameParam);
  const [country, setCountry] = React.useState(countryParam);
  const [winnings, setWinnings] = React.useState(winningsParam);
  const [imageUrl, setImageUrl] = React.useState(imageUrlParam);
  const [id, setId] = React.useState(idParam);

  useEffect(() => {
    setName(nameParam);
    setCountry(countryParam);
    setWinnings(winningsParam);
    setImageUrl(imageUrlParam);
    setId(idParam);
  }, [nameParam, countryParam, winningsParam, imageUrlParam, idParam]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const handleWinningsChange = (e) => {
    const re = /^[0-9]*\.?[0-9]{0,2}$/;
    if (!(e.target.value === '' || re.test(e.target.value))) {
      return;
    }
    setWinnings(e.target.value);
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="Add Player Modal"
      aria-describedby="Modal Form for adding a player"
    >
      <div className="modal-container">
        <div className="modal-container--header">
          <span className="modal-container--header-font">{title}</span>
        </div>
        <form id="player-form">
          <div className="modal-container--body">
            <div className="modal-container--field-container">
              <label className="modal-container--label" htmlFor="name">
                Name:
              </label>
              <input
                id="name"
                type="text"
                name="name"
                required
                className="modal-container--input"
                value={name}
                onChange={handleNameChange}
              />
              <span style={{ color: 'red' }}>*</span>
            </div>
            <div className="modal-container--field-container">
              <label className="modal-container--label" htmlFor="country">
                Country:
              </label>
              <select
                id="country"
                type="text"
                name="name"
                required
                className="modal-container--input"
                value={country}
                onChange={handleCountryChange}
              >
                {Object.entries(COUNTRIES).map((country) => {
                  return (
                    <option key={country[0]} value={country[0]}>
                      {country[1]}
                    </option>
                  );
                })}
              </select>
              <span style={{ color: 'red' }}>*</span>
            </div>
            <div className="modal-container--field-container">
              <label className="modal-container--label" htmlFor="winnings">
                Winnings:
              </label>
              <input
                id="winnings"
                type="text"
                name="name"
                required
                className="modal-container--input"
                value={winnings}
                onChange={handleWinningsChange}
              />
              <span style={{ color: 'red' }}>*</span>
            </div>
            <div className="modal-container--field-container">
              <label className="modal-container--label" htmlFor="ImageUrl">
                ImageUrl:
              </label>
              <input
                id="ImageUrl"
                type="text"
                name="name"
                className="modal-container--input"
                value={imageUrl}
                onChange={handleImageUrlChange}
              />
            </div>
          </div>
          <div className="modal-container--footer">
            <input
              className="modal-container--button"
              type="button"
              value="Cancel"
              onClick={handleClose}
            />
            <input
              className="modal-container--button"
              type="submit"
              value="Submit"
              onClick={() =>
                submitFn(setWinnings, name, country, winnings, imageUrl, id)
              }
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

PlayerTableModal.propTypes = {
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  submitFn: PropTypes.func.isRequired,
  nameParam: PropTypes.string,
  countryParam: PropTypes.string,
  winningsParam: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  imageUrlParam: PropTypes.string,
  idParam: PropTypes.string,
};

export default PlayerTableModal;

import { combineReducers } from 'redux';

import playerIds from './playerIds';
import players from './players';
import page from './page';

export default combineReducers({
  playerIds,
  players,
  page,
});

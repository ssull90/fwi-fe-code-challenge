import { FETCH_PLAYERS_SUCCESS } from './constants';

export default function playerIds(state = {}, action) {
  switch (action.type) {
    case FETCH_PLAYERS_SUCCESS:
      return { from: action.payload.data.from, size: action.payload.data.size, total: action.payload.data.total };
    default:
      return state;
  }
}
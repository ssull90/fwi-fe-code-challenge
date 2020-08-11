import React from 'react';

import Header from './Header/Header';
import PlayerTable from './PlayerTable/PlayerTable';
import TableMenu from './PlayerTable/TableMenu'

const App = () => {
  return (
    <>
      <Header />
      <TableMenu />
      <PlayerTable />
    </>
  );
};

export default App;

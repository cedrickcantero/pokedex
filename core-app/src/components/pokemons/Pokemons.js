import React from 'react';
import { AgGridReact } from 'ag-grid-react';

const Pokemons = () => {
  // Your columns and row data go here
  // ...
  
  return (
    <div className="ag-theme-alpine" style={{ height: '400px', width: '100%' }}>
      {/* <AgGridReact columnDefs={columnDefs} rowData={rowData} /> */}
    </div>
  );
}

export default Pokemons;

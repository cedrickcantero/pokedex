import React, { useState, useRef, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { useTypes } from './typesServiceProvider';
import { typeColumnDefs } from './defaults';
import { debounce } from '../../utils/debounce';
import { capitalizeFirstChar } from '../../utils/string-helper';

const Types = () => {

  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [{fetchAllTypes, fetchTypeByName}] = useTypes() 
  const searchInputRef = useRef();
  const filterDropdownRef = useRef();
  const [types, setTypes] = useState([])

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  
    params.api.sizeColumnsToFit(); // This will size columns to fit grid width
  };
  
  const handleSearch = debounce(async () => {
    const query = searchInputRef.current.value;
    if (query) {
      try {
        const result = await fetchTypeByName(capitalizeFirstChar(query));
        setTypes([result]); // If you expect multiple, adjust accordingly
      } catch (error) {
        console.log("Error fetching Item by name", error);
      }
    } else {
      // If query is empty, fetch all Pokemons
      try {
        const allItems = await fetchAllTypes();
        setTypes(allItems);
      } catch (error) {
        setTypes([])
        console.log("Error fetching all Items", error);
      }
    }
  }, 500); // 300ms delay

  useEffect(() => {
    const fetchTypes = async() => {
      await fetchAllTypes()
      .then(data => {
        setTypes(data)
      })
      .catch(err=>{
        setTypes([])
      })
    }

    fetchTypes()

  }, []);

  return (
    <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
    <div style={{ marginBottom: '10px' }}>
      <input 
        type="text" 
        ref={searchInputRef} 
        placeholder="Search Type" 
        onInput={handleSearch}
      />
    </div>
    <AgGridReact 
      onGridReady={onGridReady}
      columnDefs={typeColumnDefs} 
      rowData={types} 
    />
  </div>
  )
}

export default Types;

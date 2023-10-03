import React, { useState, useRef, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { useMove } from './moveServiceProvider';
import { useTypes } from '../types/typesServiceProvider';
import { debounce } from '../../utils/debounce';
import { capitalizeFirstChar } from '../../utils/string-helper';
import { moveColumnDefs, moveTypes } from './defaults';

const Moves = () => {

  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [{fetchAllMoves, fetchMoveByName}] = useMove() 
  const [{fetchAllTypes}] = useTypes() 
  const searchInputRef = useRef();
  const filterDropdownRef = useRef();
  const [moves, setMoves] = useState([])
  const [moveTypes, setMoveTypes] = useState([]);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  
    params.api.sizeColumnsToFit(); // This will size columns to fit grid width
  };
  

  const handleSearch = debounce(async () => {
    const query = searchInputRef.current.value;
    if (query) {
      try {
        const result = await fetchMoveByName(capitalizeFirstChar(query));
        setMoves([result]); // If you expect multiple, adjust accordingly
      } catch (error) {
        console.log("Error fetching Move by name", error);
      }
    } else {
      // If query is empty, fetch all Pokemons
      try {
        const allMoves = await fetchAllMoves();
        setMoves(allMoves);
      } catch (error) {
        setMoves([]);
        console.log("Error fetching all Pokémons", error);
      }
    }
  }, 500); // 300ms delay

  const handleFilter = async () => {
    let selectedFilter = capitalizeFirstChar(filterDropdownRef.current.value);
    
    const filteredMoves = await fetchAllMoves({ type: selectedFilter });
    setMoves(filteredMoves);
  };

  useEffect(() => {
    const fetchMoves = async() => {
      await fetchAllMoves()
      .then(data => {
        setMoves(data)
      })
      .catch(err=>{
        setMoves([]);
      })
    }

    fetchMoves()

  }, []);

  useEffect(() => {
    const fetchTypes = async() => {
      await fetchAllTypes()
      .then(data => {
        setMoveTypes(data)
      })
      .catch(err=>{
        setMoveTypes([])
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
        placeholder="Search Move" 
        onInput={handleSearch}
      />
      <select ref={filterDropdownRef} onChange={handleFilter}>
        <option key="" value="">Select Filter </option>
        {moveTypes.map((moveType, index) => (
          <option key={index} value={moveType.english}>
            {moveType.english}
          </option>
        ))}
      </select>
    </div>
    <AgGridReact 
      onGridReady={onGridReady}
      columnDefs={moveColumnDefs} 
      rowData={moves} 
    />
  </div>
  );
}

export default Moves;

import React, { useState, useRef, useEffect } from 'react';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import { usePokemon } from './pokemonServiceProvider';
import { useTypes } from '../types/typesServiceProvider';
import { pokemonColumnDefs } from './defaults';
import { debounce } from '../../utils/debounce';
import { capitalizeFirstChar } from '../../utils/string-helper';

const Pokemons = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [{fetchAllPokemons, fetchPokemonByName}] = usePokemon() 
  const [{fetchAllTypes}] = useTypes() 
  const searchInputRef = useRef();
  const filterDropdownRef = useRef();
  const [pokemons, setPokemons] = useState([])
  const [pokemonTypes, setPokemonTypes] = useState([])

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  
    params.api.sizeColumnsToFit(); // This will size columns to fit grid width
  };
  
  const handleSearch = debounce(async () => {
    const query = searchInputRef.current.value;
    if (query) {
      try {
        const result = await fetchPokemonByName(capitalizeFirstChar(query));
        setPokemons([result]); // If you expect multiple, adjust accordingly
      } catch (error) {
        console.log("Error fetching Pokemon by name", error);
      }
    } else {
      // If query is empty, fetch all Pokemons
      try {
        const allPokemons = await fetchAllPokemons();
        setPokemons(allPokemons);
      } catch (error) {
        setPokemons([]);
        console.log("Error fetching all Pokémons", error);
      }
    }
  }, 500); // 300ms delay
  
  const handleFilter = async () => {
    let selectedFilter = capitalizeFirstChar(filterDropdownRef.current.value);
    
    const filteredPokemons = await fetchAllPokemons({ type: selectedFilter });
    setPokemons(filteredPokemons);
  };
  
  useEffect(() => {
    const fetchPokemons = async() => {
      try {
        const data = await fetchAllPokemons();
        setPokemons(data);
      } catch (err) {
        console.error('Error fetching Pokemons:', err);
        setPokemons([]);
      }
    };

    fetchPokemons()

  }, []);

  useEffect(() => {
    const fetchTypes = async() => {
      await fetchAllTypes()
      .then(data => {
        setPokemonTypes(data)
      })
      .catch(err=>{
        setPokemonTypes([])
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
        placeholder="Search Pokemon" 
        onInput={handleSearch}
      />
      <select ref={filterDropdownRef} onChange={handleFilter}>
        <option key="" value="">Select Filter </option>
        {Array.isArray(pokemonTypes) && pokemonTypes.map((pokemonType, index) => (
          <option key={index} value={pokemonType.english}>
            {pokemonType.english}
          </option>
        ))}
      </select>
    </div>
    <AgGridReact 
      onGridReady={onGridReady}
      columnDefs={pokemonColumnDefs} 
      rowData={pokemons}
    />
  </div>
  );
}

export default Pokemons;

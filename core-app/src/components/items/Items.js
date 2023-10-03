import React, { useState, useRef, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { itemColumnDefs } from './defaults';
import { useItem } from './ItemServiceProvider';
import { debounce } from '../../utils/debounce';
import { capitalizeFirstChar } from '../../utils/string-helper';

const Items = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [{fetchAllItems, fetchItemByName}] = useItem() 
  const searchInputRef = useRef();
  const [items, setItems] = useState([])

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  
    params.api.sizeColumnsToFit(); // This will size columns to fit grid width
  };
  
  const handleSearch = debounce(async () => {
    const query = searchInputRef.current.value;
    if (query) {
      try {
        const result = await fetchItemByName(capitalizeFirstChar(query));
        setItems([result]); // If you expect multiple, adjust accordingly
      } catch (error) {
        console.log("Error fetching Item by name", error);
      }
    } else {
      // If query is empty, fetch all Pokemons
      try {
        const allItems = await fetchAllItems();
        setItems(allItems);
      } catch (error) {
        setItems([])
        console.log("Error fetching all Items", error);
      }
    }
  }, 500); // 300ms delay


  useEffect(() => {
    const fetchItems = async() => {
      await fetchAllItems()
      .then(data => {
        setItems(data)
      })
      .catch(err=>{
        console.log("went in this error")
        // console.log("err",err)
        setItems([])
      })
    }

    fetchItems()

  }, []);
  
  return (
    <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
      <div style={{ marginBottom: '10px' }}>
        <input 
          type="text" 
          ref={searchInputRef} 
          placeholder="Search an Item" 
          onInput={handleSearch}
        />
      </div>
      <AgGridReact 
        onGridReady={onGridReady}
        columnDefs={itemColumnDefs} 
        rowData={items} 
      />
    </div>
  );
};
  

export default Items;



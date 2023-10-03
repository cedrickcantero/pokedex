import React, { useState, useRef, useEffect } from 'react';

import { AgGridReact } from 'ag-grid-react';
import { itemColumnDefs, itemRowDefs } from './defaults';
import { useItem } from './ItemServiceProvider';


const Items = () => {
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const [{fetchAllItems}] = useItem() 
    const searchInputRef = useRef();
    const filterDropdownRef = useRef();
    const [items, setItems] = useState([])
  
    const onGridReady = (params) => {
      setGridApi(params.api);
      setGridColumnApi(params.columnApi);
    
      params.api.sizeColumnsToFit(); // This will size columns to fit grid width
    };
    
  
    const handleSearch = () => {
      gridApi.setQuickFilter(searchInputRef.current.value);
    };
  
    const handleFilter = () => {
      let selectedFilter = filterDropdownRef.current.value;
      let filterInstance = gridApi.getFilterInstance("type"); // assuming the column field is "type"
  
      filterInstance.setModel({
        type: "equals",
        filter: selectedFilter,
      });
  
      gridApi.onFilterChanged();
    };

    useEffect(() => {
      const fetchItems = async() => {
        await fetchAllItems()
        .then(data => {
          setItems(data)
        })
        .catch(err=>{
          console.log("err",err)
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
            placeholder="Search..." 
            onInput={handleSearch}
          />
          <select ref={filterDropdownRef} onChange={handleFilter}>
            <option value="">All Types</option>
            <option value="Fire">Fire</option>
            <option value="Water">Water</option>
          </select>
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



export const itemColumnDefs = [
  { headerName: "ID", field: "id" },
  { 
    headerName: "Name", 
    valueGetter: params => params.data.name ? params.data.name.english : null 
  },
  // ... other columns
];


export const itemRowDefs = [
    { name: "Pokeball", id: "testid" },
    // ... other columns
  ];
  
export const itemColumnDefs = [
  { headerName: "ID", field: "_id" },
  { 
    headerName: "Name", 
    valueGetter: params => params.data.name ? params.data.name.english : null 
  },
];

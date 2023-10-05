export const itemColumnDefs = [
  { headerName: "ID", field: "_id", flex:1 },
  { 
    headerName: "Name", 
    valueGetter: params => params.data.name ? params.data.name.english : null ,
    flex:1 
  },
];

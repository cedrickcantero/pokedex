export const pokemonColumnDefs = [
  { 
    headerName: "ID", 
    field: "_id", 
    flex:1 
  },
  { 
    headerName: "Name", 
    valueGetter: params => params.data.name ? params.data.name.english : null,
    flex:1
  },
  {
    headerName: 'Type',
    valueGetter: params => params.data.type ? params.data.type.join(', ') : null,
    flex:1
  },
  {
    headerName: 'Base Stats',
    valueGetter: params => {
      if (params.data.base) {
        return Object.entries(params.data.base)
          .map(([key, value]) => `${key}: ${value}`)
          .join(', ');
      }
      return null;
    },
    flex:1
  },
  {
    headerName: 'Image',
    field: 'id',
    cellRenderer: params => {
      if (params.value) {
        const paddedId = String(params.value).padStart(3, '0');
        const imgPath = `/assets/images/sprites/${paddedId}MS.png`;
        return <img src={imgPath} style={{height: "50px", width: "50px"}} alt={`${params.value} thumbnail`} />;
      } else {
        return 'No Image';
      }
    },
    flex:1
  }
];
  
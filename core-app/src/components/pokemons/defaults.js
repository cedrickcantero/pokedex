export const pokemonColumnDefs = [
  { 
    headerName: "ID", 
    field: "_id",
  },
  { 
    headerName: "Name", 
    valueGetter: params => params.data.name ? params.data.name.english : null,
  },
  {
    headerName: 'Type',
    valueGetter: params => params.data.type ? params.data.type.join(', ') : null
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
    }
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
    }
  }
];

export const pokemonTypes = [
  { id: 'normal', name: 'Normal'},
  { id: 'fighting', name: 'Fighting'},
  { id: 'fire', name: 'Fire'},
  { id: 'ice', name: 'Ice'},
  { id: 'electric', name: 'Electric'},
  { id: 'grass', name: 'Grass'},
  { id: 'poison', name: 'Poison'},
  { id: 'bug', name: 'Bug'},
  { id: 'dragon', name: 'Dragon'},
  { id: 'physic', name: 'Physic'},
  { id: 'ghost', name: 'Ghost'},
  { id: 'ground', name: 'Ground'},
  { id: 'fairy', name: 'Fairy'},
  { id: 'dark', name: 'Dark'},
]
  
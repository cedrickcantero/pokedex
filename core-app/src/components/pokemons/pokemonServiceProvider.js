// Thunk action creator for fetching cafes
import { default as documentApi } from '../../serviceApi';

const fetchAllPokemons = async(filter) => {
    let endpoint = '/pokemon/';
    if (filter && filter.type) {
      endpoint += `?type=${filter.type}`;
    }
    return await documentApi.get(endpoint)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return error;
      });
  };

const fetchPokemonByName = async(pokeName) => {
    return await documentApi.get(`/pokemon/name/${pokeName}`, { 
    }).then(response => {
        return response.data
    }).catch(error => {
        return error
    })
}
  
export const usePokemonService = () => {
    const options = {}
    const services = {
        fetchAllPokemons,
        fetchPokemonByName
    }

    return [
        { ...services}
    ]
}

export const usePokemon = () => {
    const [  handlers ] = usePokemonService()
    return [ handlers ]
}
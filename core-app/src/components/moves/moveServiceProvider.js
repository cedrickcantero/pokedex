// Thunk action creator for fetching cafes
import { default as documentApi } from '../../serviceApi';

const fetchAllMoves = async(filter) => {
    let endpoint = '/moves/';
    if (filter && filter.type) {
      endpoint += `?type=${filter.type}`;
    }
    return await documentApi.get(endpoint)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return [];
      });
};

const fetchMoveByName = async(moveName) => {
    return await documentApi.get(`/moves/name/${moveName}`, { 
    }).then(response => {
        return response.data
    }).catch(error => {
        return []
    })
}
  
export const useMovesService = () => {
    const options = {}
    const services = {
        fetchAllMoves,
        fetchMoveByName
    }

    return [
        { ...services}
    ]
}

export const useMove = () => {
    const [  handlers ] = useMovesService()
    return [ handlers ]
}
// Thunk action creator for fetching cafes
import { default as documentApi } from '../../serviceApi';

const fetchAllTypes = async() => {
    return await documentApi.get(`/types/`, { 
    }).then(response => {
        return response.data
    }).catch(error => {
        return error
    })
}


const fetchTypeByName = async(pokeName) => {
    return await documentApi.get(`/types/name/${pokeName}`, { 
    }).then(response => {
        return response.data
    }).catch(error => {
        return error
    })
}
  
export const useTypesService = () => {
    const options = {}
    const services = {
        fetchAllTypes,
        fetchTypeByName
    }

    return [
        { ...services}
    ]
}

export const useTypes = () => {
    const [  handlers ] = useTypesService()
    return [ handlers ]
}
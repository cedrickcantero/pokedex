// Thunk action creator for fetching cafes
import { default as documentApi } from '../../serviceApi';

const fetchAllItems = async() => {
    return await documentApi.get(`/items/`, { 
    }).then(response => {
        return response.data
    }).catch(error => {
        return error
    })
}

const fetchItemByName = async(pokeName) => {
    return await documentApi.get(`/items/name/${pokeName}`, { 
    }).then(response => {
        return response.data
    }).catch(error => {
        return error
    })
}

export const useItemService = () => {
    const options = {}
    const services = {
        fetchAllItems,
        fetchItemByName
    }

    return [
        { ...services}
    ]
}

export const useItem = () => {
    const [  handlers ] = useItemService()
    return [ handlers ]
}
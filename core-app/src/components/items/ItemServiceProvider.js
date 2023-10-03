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
  


export const useItemService = () => {
const options = {}
const services = {
    fetchAllItems,
}

return [
    { ...services}
]
}

export const useItem = () => {
const [  handlers ] = useItemService()
return [ handlers ]
}
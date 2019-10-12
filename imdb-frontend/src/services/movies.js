import axios from 'axios'
const baseUrl = '/api/movies'

const get = async (path) => {
    try {
        if (path !== 'all') {
            const response = await axios.get(`${baseUrl}/${path}`)
            console.log(response.data.slice(0,10))
            return response.data
        } else {
            const response = await axios.get(`${baseUrl}/all`)
            return response.data
        }
    } catch(error) {
        console.log(error)
    }
}

export default { get }
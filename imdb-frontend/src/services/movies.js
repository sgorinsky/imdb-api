import axios from 'axios'
const baseUrl = '/api/movies'

// only get request needed for project at the moment
const get = async (path) => {
    // rest get
    try {
        if (path !== 'all') {
            const response = await axios.get(`${baseUrl}/${path}`)
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
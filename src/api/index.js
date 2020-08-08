import axios from 'axios'

// API urls
const url = "https://covid19.mathdro.id/api"

// async for asynchronous data
export const fetchData = async () => {
    // try-catch block to prepare for error
    try {
        const { data: {confirmed, recovered, deaths, lastUpdate} } = await axios.get(url)
        
        return {confirmed, recovered, deaths,lastUpdate}
    } catch (error) {

    }
}
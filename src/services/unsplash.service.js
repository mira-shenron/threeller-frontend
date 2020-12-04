import axios from 'axios'

async function searchPhotos(q) {
    // Defining our variables
    const KEY = 'BmU0rPc-9SoJOO7VHLyg7MNAwAbXd12M6JRHalvuapU'; 
    try {
        const res = await axios.get(`https://api.unsplash.com/search/photos?query=${q}&per_page=30&orientation=landscape&client_id=${KEY}`);
        return res.data.results
    } catch (err) {
        console.error('ERROR!', err);
    }
}

export default {
    searchPhotos
}
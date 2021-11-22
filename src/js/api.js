import axios from 'axios';
const KEY = '24434381-44274459aa1c477262f392712';

const BASE_URL = 'https://pixabay.com/api';

export async function searchImages(userRequest, page, perPage) {
    return await axios.get(`${BASE_URL}/?key=${KEY}&q=${userRequest}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${page}`,);
     
}

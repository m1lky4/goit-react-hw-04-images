import axios from "axios";


axios.defaults.baseURL = "https://pixabay.com/api/";

const API_KEY = "36186802-862f6fad69a85448277218aac";

export async function getImages(query, page) {
    return await axios(`?key=${API_KEY}`, {
        params:
        {
            q: query,
            per_page: 15,
            page: page
        }
    });
}
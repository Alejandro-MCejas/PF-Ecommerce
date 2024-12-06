import axios from "axios";

const YOUTUBE_API_KEY = 'AIzaSyBd7OyN4il_roR94i92CiyGPbukg0F4pwM'; // Reemplaza con tu clave API
const BASE_URL = "https://www.googleapis.com/youtube/v3/search";

export const searchYoutubeVideo = async (query: string) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                part: "snippet",
                q: query + " game official", // Ajusta la búsqueda
                type: "video",
                key: YOUTUBE_API_KEY,
                maxResults: 1,
            },
        });
        console.log("search youtube", response);
        const videoId = response.data.items?.[0]?.id?.videoId;
        console.log("video", videoId);

        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    } catch (error) {
        console.error("Error al buscar video en YouTube:", error);
        return null;
    }
};



import axios from "axios";

export default axios.create({
    baseURL: `http://localhost:8080/tts/`,
    headers: {
        "Content-Type": "application/json"
    }
});

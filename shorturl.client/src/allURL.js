import axios from "axios";
export const fetchAllURL= async() => 
{
    try{
        var response = await axios.get('https://localhost:7043/api/UrlShortener');
        return response.data;
    }
    catch(e){
        console.error(e);
    }
}
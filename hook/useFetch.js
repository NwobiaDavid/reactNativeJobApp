import {useState, useEffect} from 'react';
import axios from 'axios';
// import {RAPID_API_KEY} from '@env'

// const rapidkey = RAPID_API_KEY;

export default function useFetch(endpoint, query) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

   

const options = {
  method: 'GET',
  url: `https://jsearch.p.rapidapi.com/${endpoint}`,
  headers: {
    'X-RapidAPI-Key': 'e86e6a03d8msh574ae9140f38357p15cbd0jsnacd98377167f',
    'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
  },
  params: {...query},

};

const fetchData = async ()=>{
    setIsLoading(true);

    try{
        const response = await axios.request(options);

        setData(response.data.data);
        setIsLoading(false);
    }catch(error){
        setError(error);
        alert('an error has occurred')
    }finally{
        setIsLoading(false);
    }
}

useEffect(() => {
    fetchData();
}, []);

const refetch = () =>{
    setIsLoading(true);
    fetchData();
}

return {data, isLoading, error, refetch};
}
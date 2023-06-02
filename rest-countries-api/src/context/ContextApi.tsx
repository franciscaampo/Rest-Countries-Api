import React, { createContext, useContext, useEffect, useState} from 'react';
import axios from 'axios';

const http = axios.create({
  baseURL: 'https://restcountries.com/v2',
})

const ContextApi = createContext<any>(null) 
  
export const ApiProvider: React.FC = ({ children }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
        try {
          const response = await http.get('/all');
          setCountries(response.data);
        }catch (error){
          console.error('Failed to retrieve countries:', error);
        }
    };
    fetchCountries();
  }, []);
  
  return (
    <ContextApi.Provider value={countries}>
      {children}
    </ContextApi.Provider>
  )
}


export const useApi = () => useContext(ContextApi);
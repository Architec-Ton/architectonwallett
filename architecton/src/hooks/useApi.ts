// import useSWR, { Fetcher } from 'swr';
import { BE_URL } from '../constants';

import { useState } from 'react';
const useApi = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchData = async (url, method = 'GET', body = null) => {
    setIsLoading(true);
    setError(null);
    try {
      const options = {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        mode: 'cors',
      } as RequestInit;
      if (body) {
        options.body = JSON.stringify(body);
      }
      const response = await fetch(`${BE_URL}${url}`, options);
      if (!response.ok || response.status > 399) {
        console.log('fetchError', response.status);
        setError(response.status);
        throw new Error('Network response was not ok');
        setError(response.status);
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.log('error', error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  return { data, isLoading, error, fetchData };
};
export default useApi;

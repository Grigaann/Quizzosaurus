import { useState, useEffect } from "react";

import axios from "axios";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setData(null);
      setError(null);
      try {
        const res = await axios.get(url);
        const collectedData = res.data.fetchedData;
        collectedData && setData(collectedData);
      } catch (err) {
        setError("An error occurred.");
      }
    };
    fetchData();
  }, [url]);

  return { data, error };
};

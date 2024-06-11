import { useState, useEffect } from "react";
import { axiosInstance } from "../../config/Config";

export const useApiCache = (url, params = {}, options = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Destructuring options with a default cache duration
  const { cacheDuration = 300000 } = options; // default cache duration of 5 minutes

  useEffect(() => {
    const cacheKey = `cache_${url}_${JSON.stringify(params)}`;
    const cachedData = localStorage.getItem(cacheKey);
    const cacheTimeKey = `cache_time_${url}_${JSON.stringify(params)}`;
    const cacheTime = localStorage.getItem(cacheTimeKey);

    const fetchData = async () => {
      console.log("Calling API");
      setLoading(true);
      try {
        const response = await axiosInstance.get(url, { params });
        setData(response.data);
        localStorage.setItem(cacheKey, JSON.stringify(response.data));
        localStorage.setItem(cacheTimeKey, Date.now().toString());
      } catch (err) {
        setError(err);
        console.error("API call failed: ", err);
      } finally {
        setLoading(false);
      }
    };

    // Fetch data if no cache or cache is expired
    if (
      cachedData &&
      cacheTime &&
      Date.now() - parseInt(cacheTime) < cacheDuration
    ) {
      console.log("Data from cache");

      setData(JSON.parse(cachedData));
      //   console.log(JSON.parse(cachedData));
    } else {
      console.log("Data from API");
      fetchData();
    }
  }, [url, JSON.stringify(params), cacheDuration]);

  console.log({ data, error, loading });
  return { data, error, loading };
};

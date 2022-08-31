import { useState, useEffect } from "react";

import { getFormattedWeatherData, getFormattedSearchData } from '../service';

export const useWeatherData = (query, units, evnetHandler) => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, settError] = useState(false);

    useEffect(() => {  
        if (evnetHandler === true) {
            const fetchWeather = async () => {
                try {
                    settError(false);
                    setLoading(true);
                    await getFormattedWeatherData({ ...query, units }).then(
                        (data) => {
                            setWeatherData(data);
                        }
                    );
                }
                catch (error) {
                    settError(true);
                };
                setLoading(false);
            }
    
            fetchWeather();
        } 
        
    }, [query, units, evnetHandler]);
    
    return { weatherData, loading, error };
};

export const useSearchData = (query, units, evnetHandler) => {
    const [searchData, setSearchData] = useState(null);
    const [loadingData, setLoadingData] = useState(false);
    const [err, setErr] = useState(false);

    useEffect(() => {
        if (evnetHandler === true) {
            const fetchData = async () => {
                try {
                    setErr(false);
                    setLoadingData(true);
                    await getFormattedSearchData({ ...query, units }).then(
                        (data) => {
                            setSearchData(data);
                        }
                    );
                }
                catch (error) {
                    setErr(true);
                };
                setLoadingData(false);
            }

            fetchData();
        }
    }, [query, units, evnetHandler]);

    return { searchData, setSearchData, loadingData, err };
};

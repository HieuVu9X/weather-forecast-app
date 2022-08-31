import './App.css';
import React, { useEffect, useState} from 'react';
import SearchBar from './Components/SearchBar/SearchBar';
import CurrentWeather from './Components/CurrentWeather/CurrentWeather';
import HourlyForecast from './Components/HourlyForecast/HourlyForecast';
import DailyForecast from './Components/DailyForecast/DailyForecast';
import { useWeatherData } from './hooks/useDataFetch';

function App() {
    const [query, setQuery] = useState({ q: '' })
    const [get, setGet] = useState(false);
    const [location, setLocation] = useState({ q: '' });
    const [units, setUnits] = useState("metric");
    const [unitIcon, setUnitIcon] = useState('°C');
    const [filteredCurrent, setFilteredCurrent] = useState([]);
    const [filteredHourly, setFilteredHourly] = useState([]);
    const [filtered7Days, setFiltered7Days] = useState([]);

    useEffect(() => {
        if (location.q !== '') {
            setGet(true);
            setQuery(location);
        } else {   
            setGet(false);
        }
    },[location])

    const {
        weatherData,
        loading,
        error
    } = useWeatherData(query, units, get);

    useEffect(() => {   
        if (weatherData !== null) {
            const newFilterCurrent = weatherData.formattedWeather.current;
            const newFilterHourly = weatherData.formattedWeather.hourly;
            const newFilter7Days = weatherData.formattedWeather.daily;
            setFilteredCurrent(newFilterCurrent);
            setFilteredHourly(newFilterHourly);
            setFiltered7Days(newFilter7Days);
        }
    },[weatherData]);

    // console.log(filteredCurrent);
    
  return (
    <div className="App">
            <SearchBar  placeholder = "Enter a city name" 
                        setLocation = {setLocation}
                        units = {units} 
                        unitIcon = {unitIcon} 
                        setUnits = {setUnits} 
                        setUnitIcon = {setUnitIcon}
                        setGet = {setGet}/>
            <div className="Container">
                <div className='CurrentWeather'>
                    <CurrentWeather weatherData = {weatherData} filteredCurrent = {filteredCurrent} unitIcon = {unitIcon}/>
                </div>
                <div className='ForecastWeather'>
                    <HourlyForecast filteredHourly = {filteredHourly} unitIcon = {unitIcon}/>
                    <DailyForecast filtered7Days = {filtered7Days} unitIcon = {unitIcon}/>
                </div>
            </div>
    </div>
  );
}

export default App;

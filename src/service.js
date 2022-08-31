import { DateTime } from "luxon";

// const API_KEY = "516758aeb2a085c36a905fe0d58f576e";
const API_KEY = "f2034f908c4a169dbdc0cda89a52bcb9";

const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = ( infoType, searchParams ) => {
    const url = new URL(BASE_URL + "/" + infoType);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY});

    return fetch(url).then((res) => res.json());
};

const formatSearchData = (data) => {
    let { message, count, list } = data;
    list = list.slice(0, list.length).map((d) => {
        return {
            id: d.id,
            name: d.name,
            lat: d.coord.lat,
            lon: d.coord.lon,
            temp: d.main.temp,
            sys: d.sys.country,
            icon: d.weather[0].icon,
        };
    });
    
    return { message, count, list };
}

const formatCurrentWeather = (data) => {
    const {
        coord: { lat, lon },
        main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
        wind: { speed, deg, gust },
        dt,
        sys: { country, sunrise, sunset },
        weather,
        name,
        timezone,
        visibility,
    } = data;

    const { main: details, description, icon } = weather[0];

    return {
        lat,
        lon,
        temp,
        feels_like,
        temp_min,
        temp_max,
        pressure,
        humidity,
        speed,
        deg,
        gust,
        title: formatToLocalTime(data.dt, timezone),
        country,
        sunrise: formatToLocalTime(data.sys.sunrise, timezone, "hh:mm a"),
        sunset: formatToLocalTime(data.sys.sunset, timezone, "hh:mm a"),
        details,
        description,
        icon,
        name,
        timezone,
        visibility,
    };
};

const formatWeather = (data) => {
    let { timezone, current, daily, hourly } = data;
    current = {
        dt: current.dt,
        title: formatToLocalTime(current.dt, timezone),
        clouds: current.clouds,
        dew_point: current.dew_point,
        feels_like: current.feels_like,
        humidity: current.humidity,
        pressure: current.pressure,
        sunrise: formatToLocalTime(current.sunrise, timezone, "hh:mm a"),
        sunset: formatToLocalTime(current.sunset, timezone, "hh:mm a"),
        temp: current.temp,
        uvi: current.uvi,
        visibility: current.visibility,
        description: current.weather[0].description,
        icon: current.weather[0].icon,
        main: current.weather[0].main,
        wind_deg: current.wind_deg,
        wind_speed: current.wind_speed,
    };

    daily = daily.slice(1, 8).map((d) => {
        return {
            dt: d.dt,
            title: formatToLocalTime(d.dt, timezone, "cccc, dd'-'LL'-'yyyy"),
            cloud: d.clouds,
            dew_point: d.dew_point,
            feels_like: d.feels_like,
            humidity: d.humidity,
            pop: d.pop,
            pressure: d.pressure,
            rain: d.rain,
            sunrise: formatToLocalTime(d.sunrise, timezone, "hh:mm a"),
            sunset: formatToLocalTime(d.sunset, timezone, "hh:mm a"),
            moonrise: formatToLocalTime(d.moonrise, timezone, "hh:mm a"),
            moonset: formatToLocalTime(d.moonset, timezone, "hh:mm a"),
            temp: d.temp,
            uvi: d.uvi,
            description: d.weather[0].description,
            icon: d.weather[0].icon,
            main: d.weather[0].main,
            wind_deg: d.wind_deg,
            wind_speed: d.wind_speed,
        };
    });

    hourly = hourly.slice(1, 25).map((d) => {
        return {
            dt: d.dt,
            title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
            cloud: d.clouds,
            dew_point: d.dew_point, 
            feels_like: d.feels_like,   
            humidity: d.humidity,
            pop: d.pop,
            pressure: d.pressure,
            temp: d.temp,
            uvi: d.uvi,
            description: d.weather[0].description,
            icon: d.weather[0].icon,
            main: d.weather[0].main,
            wind_deg: d.wind_deg,
            wind_speed: d.wind_speed,
        };
    });

    return { timezone, current, daily, hourly };
};

const getFormattedSearchData = async (searchParams) => {

    const formattedSearchData = await getWeatherData(
        "find",
        searchParams
    ).then(formatSearchData);

    return { formattedSearchData };
}

const getFormattedWeatherData = async (searchParams) => {

    const formattedCurrentWeather = await getWeatherData(
        "weather",
        searchParams
    ).then(formatCurrentWeather);

    const { lat, lon } = formattedCurrentWeather;

    const formattedWeather = await getWeatherData(
        "onecall",
        {
            lat,
            lon,
            // exclude: "current, minutely, alerts",
            units: searchParams.units,
        }
    ).then(formatWeather);  

    return { ...formattedCurrentWeather, formattedWeather };
};

const formatToLocalTime = (
    secs, 
    zone,   
    format = "cccc, dd'-'LL'-'yyyy' | LocalTime: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);
// 

const flagUrlFromCode = (code) => 
    `https://openweathermap.org/images/flags/${code}.png`
const iconUrlFromCode = (code) => 
    `http://openweathermap.org/img/wn/${code}@2x.png`;

export { formatToLocalTime, iconUrlFromCode, flagUrlFromCode, getFormattedSearchData, getFormattedWeatherData }

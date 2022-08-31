import React, { useState, useEffect } from 'react';
import './CurrentWeather.css';
import { MdOutlineVisibility } from 'react-icons/md';
import { WiHumidity } from 'react-icons/wi';
import { TbWind, TbTemperature, TbGauge } from 'react-icons/tb';
import { TiLocationArrow } from 'react-icons/ti';
import { BsSunrise, BsSunset } from 'react-icons/bs';
import { FaTemperatureHigh, FaTemperatureLow} from 'react-icons/fa';
import { GoLocation } from 'react-icons/go';
import { HiOutlineSun } from 'react-icons/hi';
import { HiOutlineArrowNarrowUp } from 'react-icons/hi';


function CurrentWeather({ weatherData, filteredCurrent, unitIcon }) {   

    useEffect(() => {
        if (filteredCurrent.length !== 0) {

            const uvi = document.getElementById("uvi");
            if (filteredCurrent.uvi < 3) {
                uvi.innerHTML = "LOW";
                uvi.style.color = "#67BE4D";
            } else if (filteredCurrent.uvi >= 3 && filteredCurrent.uvi < 6) {
                uvi.innerHTML = "MODERATE";
                uvi.style.color = "#FCBD22";
            } else if (filteredCurrent.uvi >= 6 && filteredCurrent.uvi < 8) {
                uvi.innerHTML = "HIGH";
                uvi.style.color = "#F66B34";
            } else if (filteredCurrent.uvi >= 8 && filteredCurrent.uvi < 11) {
                uvi.innerHTML = "VERY HIGH";
                uvi.style.color = "#EE154A";
            } else if (filteredCurrent.uvi >= 11) {
                uvi.innerHTML = "EXTREME";
                uvi.style.color = "#7B439C";
            };

            const windDirection = filteredCurrent.wind_deg;
            const direction = document.getElementById("direction");
            const windCompass = document.querySelector(".windCompass");
            const compassDisplay = document.querySelector(".compassDisplay");

            let targetDirectionDegree = windDirection + 45;
            windCompass.style.transform = `rotate(${targetDirectionDegree}deg)`
            compassDisplay.style.transform = `rotate(${targetDirectionDegree * -1}deg)`

            if (windDirection > 11.25 && windDirection <= 33.75) {
                direction.innerHTML = "NNE";
            }
            else if (windDirection > 33.75 && windDirection <= 56.25) {
                direction.innerHTML = "NE";
            }
            else if (windDirection > 56.25 && windDirection <= 78.75) {
                direction.innerHTML = "ENE";
            }
            else if (windDirection > 78.75 && windDirection <= 101.25) {
                direction.innerHTML = "E";
            }
            else if (windDirection > 101.25 && windDirection <= 123.75) {
                direction.innerHTML = "ESE";
            }
            else if (windDirection > 123.75 && windDirection <= 146.25) {
                direction.innerHTML = "SE";
            }
            else if (windDirection > 146.25 && windDirection <= 168.75) {
                direction.innerHTML = "SSE";
            }
            else if (windDirection > 168.75 && windDirection <= 191.25) {
                direction.innerHTML = "S";
            }
            else if (windDirection > 191.25 && windDirection <= 213.75) {
                direction.innerHTML = "SSW";
            }
            else if (windDirection > 213.75 && windDirection <= 236.25) {
                direction.innerHTML = "SW";
            }
            else if (windDirection > 236.25 && windDirection <= 258.75) {
                direction.innerHTML = "WSW";
            }
            else if (windDirection > 258.75 && windDirection <= 281.25) {
                direction.innerHTML = "W";
            }
            else if (windDirection > 281.25 && windDirection <= 303.75) {
                direction.innerHTML = "WNW";
            }
            else if (windDirection > 303.75 && windDirection <= 326.25) {
                direction.innerHTML = "NW";
            }
            else if (windDirection > 326.25 && windDirection <= 348.75) {
                direction.innerHTML = "NNW";
            }
            else if (windDirection > 348.75) {
                direction.innerHTML = "N";
            }
        }

    },[filteredCurrent])    

    return (
        <> 
            { weatherData !== null && filteredCurrent.length !== 0 && (
                <div className='CurrentWeather'>   
                    <div id='currentContainer'>
                        <div className='time'>{weatherData.title}</div>
                        <div className='location'>
                            <GoLocation/> 
                            <span>{weatherData.name} - {weatherData.country}</span>
                        </div>
                        <div className='temp'>{weatherData.temp.toFixed(0)}{unitIcon}</div>
                        <div className='description'>{weatherData.description}</div>
                        <div className='moreTemp'>
                            <div className='realFeel'>
                                <TbTemperature size={20} className='icon'/>
                                <span> Feels like: {weatherData.feels_like.toFixed(0)}{unitIcon}</span>
                            </div>
                            <div>|</div>
                            <div className='tempMax'>
                                <FaTemperatureHigh size={20} className='icon'/>
                                <span> High: {weatherData.temp_max.toFixed(0)}{unitIcon}</span>
                            </div>
                            <div>|</div>
                            <div className='tempMin'>
                                <FaTemperatureLow size={20} className='icon'/>
                                <span> Low: {weatherData.temp_min.toFixed(0)}{unitIcon}</span>
                            </div>
                        </div>
                    </div>
                    <div className='moreDetails'>
                        <div className='item'>
                            <div className='title'>
                                <TbWind size={20} className='icon'/>
                                <span> Wind</span>
                            </div>
                            <div className='shape'>
                                <div className='details'>
                                    <div className='windCompass'>
                                        <HiOutlineArrowNarrowUp size={25} className='windArrow'/>
                                        <div className='compassDisplay'>
                                            <div id='speed'>{filteredCurrent.wind_speed.toFixed(1)} m/s</div>
                                            <div id='direction'></div>
                                        </div>
                                    </div>
                                </div>  
                            </div>   
                        </div>
                        <div className='item'>
                            <div className='title'>
                                <BsSunrise size={20} className='icon'/>
                                <span> Sunrise</span>
                                <BsSunset size={20} className='icon'/>
                                <span> Sunset</span>
                            </div>
                            <div className='shape'>
                                <div className='details'>
                                    <div className='sun_rise_set'> 
                                        <div className='horizon'>
                                            ------horizon------
                                        </div>
                                        <div className='sunrise'>
                                            Sunrise: <br />{filteredCurrent.sunrise}
                                        </div>
                                        <div className='sunset'>
                                            Sunset: <br />{filteredCurrent.sunset}
                                        </div>
                                    </div>
                                </div>
                            </div>     
                        </div>
                        <div className='item'>
                            <div className='title'>
                                <WiHumidity size={20} className='icon'/>
                                <span> Humidity</span>
                            </div>
                            <div className='shape'>
                                <div className='details'>
                                    {filteredCurrent.humidity}%
                                </div>    
                                <div className='dew_point'>
                                    The dew point is {filteredCurrent.dew_point.toFixed(0)}{unitIcon} right now
                                </div>
                            </div> 
                        </div>
                        <div className='item'>
                            <div className='title'>
                                <HiOutlineSun size={20} className='icon'/>
                                <span> UV Index</span>
                            </div>   
                            <div className='shape'>
                                <div className='details'>
                                    {filteredCurrent.uvi.toFixed(1)}
                                </div>  
                                <div id='uvi'> </div>
                            </div>                       
                        </div>
                        <div className='item'>
                            <div className='title'>
                                <TbGauge size={20} className='icon'/>
                                <span> Pressure</span>
                            </div> 
                            <div className='shape'>
                                <div className='details'>
                                    <div className='pressure'>
                                        <div className='value'>{filteredCurrent.pressure}</div>
                                        <div className='unit'>hPa</div>
                                    </div>                                    
                                </div>  
                            </div>      
                        </div>
                        <div className='item'>
                            <div className='title'>
                                <MdOutlineVisibility size={20} className='icon'/>
                                <span> Visibility</span>
                            </div>   
                            <div className='shape'> 
                                <div className='details'>
                                    <div className='visibility'>
                                        <div className='value'>{(filteredCurrent.visibility / 1000).toFixed(1)}</div>
                                        <div className='unit'>km</div>
                                    </div>
                                </div>   
                            </div>                    
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
export default CurrentWeather;

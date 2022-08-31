import React, { useEffect } from 'react';
import './DailyForecast.css';
import { WiHumidity, WiMoonrise, WiMoonset, WiSunrise, WiSunset } from 'react-icons/wi';
import { TbWind, TbGauge } from 'react-icons/tb';
import { BsCloudRain } from 'react-icons/bs';
import { GoTriangleDown } from'react-icons/go';
import { HiOutlineSun } from 'react-icons/hi';
import { iconUrlFromCode } from '../../service';

function DailyForecast({ filtered7Days, unitIcon }) {

    useEffect(() => {

        const arrow = document.getElementsByClassName('arrow');
        const extendGrid = document.getElementsByClassName('extendGrid');
        const dailyItem = document.getElementsByClassName('dailyItem');

        const clickHandler = (i) => {
            for (let j = 0; j < arrow.length; j++) {
                if (i === j) {
                    arrow[j].classList.toggle('active');
                    extendGrid[j].classList.toggle('active');
                    dailyItem[j].classList.toggle('active');
                } else {
                    arrow[j].classList.remove('active');
                    extendGrid[j].classList.remove('active');
                    dailyItem[j].classList.remove('active');
                }
            }
        }   
        
        if ( filtered7Days !== null ) {
            for (let i = 0; i < arrow.length; i++) {
                arrow[i].addEventListener('click', () => {clickHandler(i)});
            }
        }
        // console.log(arrow);
        return () => {
            if ( filtered7Days !== null ) {
                for (let i = 0; i < arrow.length; i++) {
                    arrow[i].removeEventListener('click', () => {clickHandler(i)});
                }
            }
        }
    },[filtered7Days]);

    return (
        <>
            { filtered7Days.length !== 0 && (
                <div className='dailyForecast'>
                    <div className='header'>Next 7 Days</div>
                    <div id='dailyContainer'>
                        <div id='dailyList'>
                            { filtered7Days.map((value, index) => {
                                return (
                                    <div className='dailyItem' key={index}>
                                        <div className='grid'>
                                            <div className='dailyItemTitle'>{value.title}</div>
                                            <div className='dailyItemIcon'><img src={iconUrlFromCode(value.icon)} alt=""/></div>
                                            <div className='dailyItemPop'> 
                                                <span>{(value.pop * 100).toFixed(0)}%</span>
                                            </div>
                                            <div className='dailyItemTemp'>
                                                <span>{value.temp.min.toFixed(0)}{unitIcon} - {value.temp.max.toFixed(0)}{unitIcon}</span>
                                            </div>
                                            <div className='dailyItemDetails'>
                                                <span>{value.description}</span>
                                            </div>
                                            <div className='arrow'>
                                                <GoTriangleDown size={22} id="arrowDown"/>    
                                            </div>
                                        </div>
                                        <div className='extendGrid'>
                                            <div className='dailyIcon'>
                                                <img src={iconUrlFromCode(value.icon)} alt=""/>
                                            </div>
                                            <div className='dailyDescription'>
                                                <span>{value.description}</span>
                                            </div>
                                            <div className='dailyTempMinMax'>
                                                The high will be {value.temp.max.toFixed(0)}{unitIcon}, the low will be {value.temp.min.toFixed(0)}{unitIcon}.
                                            </div>
                                            <div className='dailyPop'>
                                                <BsCloudRain size={20} className='extendForecastIcon'/>
                                                Rain: {value.rain}mm ({(value.pop * 100).toFixed(0)}%)
                                            </div>
                                            <div className='dailyWind'>
                                                <TbWind size={20} className='extendForecastIcon'/>
                                                Wind: {value.wind_speed}m/s
                                            </div>
                                            <div className='dailyPressure'>
                                                <TbGauge size={20} className='extendForecastIcon'/>
                                                Pressure: {value.pressure}hPa
                                            </div>
                                            <div className='dailyUv'>
                                                <HiOutlineSun size={20} className='extendForecastIcon'/>
                                                UV: {value.uvi}
                                            </div>
                                            <div className='dailyHumimdity'>
                                                <WiHumidity size={20} className='extendForecastIcon'/>
                                                Humidity: {value.humidity}%
                                            </div>
                                            <div className='dailyDewPoint'>
                                                Dew point: {value.dew_point} {unitIcon}
                                            </div>
                                            <div className='dailyTempFeelsLike'>
                                                <div></div>
                                                <div className='columnTitle'>Morning</div>
                                                <div className='columnTitle'>Afternoon</div>
                                                <div className='columnTitle'>Evening</div>
                                                <div className='columnTitle'>Night</div>
                                                <div className='rowTitle'>Temperature</div>
                                                <div className='tempItem'>{value.temp.morn.toFixed(0)}{unitIcon}</div>
                                                <div className='tempItem'>{value.temp.day.toFixed(0)}{unitIcon}</div>
                                                <div className='tempItem'>{value.temp.eve.toFixed(0)}{unitIcon}</div>
                                                <div className='tempItem'>{value.temp.night.toFixed(0)}{unitIcon}</div>
                                                <div className='rowTitle'>Feels Like</div>
                                                <div className='tempItem'>{value.feels_like.morn.toFixed(0)}{unitIcon}</div>
                                                <div className='tempItem'>{value.feels_like.day.toFixed(0)}{unitIcon}</div>
                                                <div className='tempItem'>{value.feels_like.eve.toFixed(0)}{unitIcon}</div>
                                                <div className='tempItem'>{value.feels_like.night.toFixed(0)}{unitIcon}</div>
                                            </div>
                                            <div className='sun-moon'>
                                                <div className='columnTitle'>
                                                    <WiSunrise size={20} className='extendForecastIcon'/>
                                                    <div className='content'>Sunrie</div>
                                                </div>
                                                
                                                <div className='columnTitle'>
                                                    <WiSunset size={20} className='extendForecastIcon'/>
                                                    <div className='content'>Sunset</div>
                                                </div>
                                                <div className='columnTitle'>
                                                    <WiMoonrise size={20} className='extendForecastIcon'/>
                                                    <div className='content'>Moonrise</div>
                                                </div>
                                                <div className='columnTitle'>
                                                    <WiMoonset size={20} className='extendForecastIcon'/>
                                                    <div className='content'>Moonset</div>
                                                </div>
                                                <div className='timeItem'>{value.sunrise}</div>
                                                <div className='timeItem'>{value.sunset}</div>
                                                <div className='timeItem'>{value.moonrise}</div>
                                                <div className='timeItem'>{value.moonset}</div>
                                            </div>
                                        </div>
                                    </div>
                                );    
                            })}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default DailyForecast



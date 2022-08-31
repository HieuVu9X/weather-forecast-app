import React, { useState, useEffect } from 'react';
import './HourlyForecast.css';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { TbWind, TbTemperature } from 'react-icons/tb';
import { BsCloudRain } from 'react-icons/bs';
import { iconUrlFromCode } from '../../service';
import MultiTypeChart from '../Chart/MultiTypeChart';

function HourlyForecast({ filteredHourly, unitIcon }) {

    useEffect(() => {  

        let isDown = false;
        let startX;
        let scrollLeft;
        let hourListScrollLeft;

        const hourList = document.getElementById("hourList");   
        const buttonScrollLeft = document.querySelector('.slider-icon.left');
        const buttonScrollRight = document.querySelector('.slider-icon.right');

        const hiddenScrollButton = (hourListScrollLeft, hourListInvisibleSize) => {
            if (hourListScrollLeft <= 0) {
                hourListScrollLeft = 0;
                hourList.scrollLeft = hourListScrollLeft;
                buttonScrollLeft.classList.add('hidden');
            } else {
                hourList.scrollLeft = hourListScrollLeft;
                buttonScrollLeft.classList.remove('hidden');
            }

            if (hourListScrollLeft >= hourListInvisibleSize) {
                hourListScrollLeft = hourListInvisibleSize;
                hourList.scrollLeft = hourListScrollLeft;
                buttonScrollRight.classList.add('hidden');
            } else {
                hourList.scrollLeft = hourListScrollLeft;
                buttonScrollRight.classList.remove('hidden');
            }
        }

        const scrollLeftHandler = (e, hourListInvisibleSize) => {
            hourList.style.scrollBehavior = 'smooth';   
            scrollLeft = hourList.scrollLeft;
            hourListScrollLeft = scrollLeft - 500; 
            hiddenScrollButton(hourListScrollLeft, hourListInvisibleSize);
        }

        const scrollRightHandler = (e, hourListInvisibleSize) => {
            hourList.style.scrollBehavior = 'smooth';
            scrollLeft = hourList.scrollLeft;            
            hourListScrollLeft = scrollLeft + 500; 
            hiddenScrollButton(hourListScrollLeft, hourListInvisibleSize);
        }

        const mouseDownHandler = (e) => {
            isDown = true;
            hourList.classList.add('active');
            startX = e.pageX - hourList.offsetLeft;
            scrollLeft = hourList.scrollLeft;
        }
    
        const mouseLeaveHandler = (e) => {
            isDown = false;
            hourList.classList.remove('active');
        }
    
        const mouseUpHandler = (e) => {
            isDown = false;
            hourList.classList.remove('active');
        }
        
        const mouseMoveHandler = (e, hourListInvisibleSize) => {
            hourList.style.scrollBehavior = '';
            if(!isDown) return;
            e.preventDefault();
            const x = e.pageX - hourList.offsetLeft;    
            const walk = (x - startX) * 3;
            hourListScrollLeft = scrollLeft - walk;
            hiddenScrollButton(hourListScrollLeft, hourListInvisibleSize);
        }
        
        if ( filteredHourly !== null && hourList !== null ) {
            const hourListInvisibleSize = hourList.scrollWidth - hourList.offsetWidth;
            buttonScrollLeft.addEventListener('click', (e) => {scrollLeftHandler(e, hourListInvisibleSize)});  
            buttonScrollRight.addEventListener('click', (e) => {scrollRightHandler(e, hourListInvisibleSize)});
            hourList.addEventListener('mousedown', (e) => {mouseDownHandler(e)});
            hourList.addEventListener('mouseleave', (e) => {mouseLeaveHandler()});
            hourList.addEventListener('mouseup', (e) => {mouseUpHandler()});
            hourList.addEventListener('mousemove', (e) => {mouseMoveHandler(e, hourListInvisibleSize)});   
        }
        return () => {
            if ( filteredHourly !== null && hourList !== null ) {   
                const hourListInvisibleSize = hourList.scrollWidth - hourList.offsetWidth;
                buttonScrollLeft.removeEventListener('click', (e) => {scrollLeftHandler(e, hourListInvisibleSize)}); 
                buttonScrollRight.removeEventListener('click', (e) => {scrollRightHandler(e, hourListInvisibleSize)});
                hourList.removeEventListener('mousedown', (e) => mouseDownHandler(e));
                hourList.removeEventListener('mouseleave', (e) => mouseLeaveHandler());
                hourList.removeEventListener('mouseup', (e) => mouseUpHandler());
                hourList.removeEventListener('mousemove', (e) => mouseMoveHandler(e, hourListInvisibleSize));
            }
        }
    },[filteredHourly]);

    return (
        <>
            { filteredHourly.length !== 0 && (
                <div className='hourlyForecast'>
                    <div className='header'>Hourly Forecast</div>
                    <div className='hourlyChart'>
                        <MultiTypeChart filteredHourly = {filteredHourly} unitIcon = {unitIcon}/>
                    </div>
                    <div id='hourlyContainer'>
                        <MdChevronLeft size={40} className='slider-icon left hidden'/>
                        <div id='hourList'>
                            { filteredHourly.map((value, index) => {
                                return (
                                    <div className='hourlyItem' key = {index}>
                                        <div className='hourlyItemTitle'>{value.title}</div>
                                        <div className='hourlyItemDetails'>{value.description}</div>
                                        <div className='hourlyItemIcon'><img src={iconUrlFromCode(value.icon)} alt=""/></div>
                                        <div className='hourlyItemTemp'>
                                            <TbTemperature size={20} className='forecastIcon'/>
                                            <span> {value.temp.toFixed(0)}{unitIcon}</span>
                                        </div>
                                        <div className='hourlyItemPop'>
                                            <BsCloudRain size={20} className='forecastIcon'/>
                                            <span> {(value.pop * 100).toFixed(0)}%</span>
                                        </div>  
                                        <div className='hourlyItemWind'>
                                            <TbWind size={20} className='forecastIcon'/>
                                            <span> {value.wind_speed.toFixed(1)}m/s</span>
                                        </div> 
                                    </div>
                                );
                            })}
                        </div>
                        <MdChevronRight size={40} className='slider-icon right'/>
                    </div>
                </div>
            )}
        </>
    )
}

export default HourlyForecast;

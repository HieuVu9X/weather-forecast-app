import React, { useState, useEffect } from 'react';
import './SearchBar.css';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import { useSearchData } from '../../hooks/useDataFetch';
import { iconUrlFromCode } from '../../service';

function SearchBar({ placeholder, setLocation, units, unitIcon, setUnits, setUnitIcon, setGet}) {

    const [query,setQuery] = useState({ q: ''});
    const [button, setButton] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
		if (wordEntered === "") {
            setFilteredData([]);
        }
    };

    const clickHandler = () => {
        setFilteredData([]);
        setWordEntered("");
        setSearchData(null);
        setButton(false);
    }

    const keyDownHandler = (event) => {
        if (event.key === "Escape") {
            setFilteredData([]);
            setWordEntered("");
            setButton(false);
        }
        if (event.key === "Enter") {
            setQuery({ q: wordEntered });
			if (wordEntered === "") {
            	setButton(false);
			} else {
				setButton(true);
			}
        }    
    }
    
    const search = () => {
        setQuery({ q: wordEntered });
        if (wordEntered === "") {
			setButton(false);
		} else {
			setButton(true);
		}	
    }

    const clearInput = () => {
        setFilteredData([]);
        setWordEntered("");
        setSearchData(null);
        setButton(false);
    }

	const selectItem = (data) => {
		setLocation({ q: data }); 
		setFilteredData([]); 
		setWordEntered("");
        setSearchData(null);
	}

    // const metric = () => {
    //     setUnits("metric");
    //     setUnitIcon('°C');
    //     setGet(true);
    // }

    // const imperial = () => {
    //     setUnits("imperial");
    //     setUnitIcon('°F');
    //     setGet(true);
    // }

    const { 
        searchData, 
        setSearchData, 
        loadingData, 
        err 
    } = useSearchData(query, units, button);

	useEffect(() => {
		if (searchData !== null) {
			const newFilter = searchData.formattedSearchData.list;
			setFilteredData(newFilter);
            if (filteredData.length !== 0) {
                const dataResult = document.getElementsByClassName('dataResult');
                const dataItem = document.getElementsByClassName('dataItem');
                const dataItemHeight = getComputedStyle(dataItem[0]).height.replace('px', '');
                let dataResultHeight = (parseInt(dataItemHeight, 10) * filteredData.length);
                if (dataResultHeight > 135) {
                    dataResultHeight = 135;
                }
                dataResult[0].style.height = dataResultHeight.toString(10) + 'px'
            } 
        } 
	}, [searchData, filteredData])

    return (
        <div className='search'>
            <div className='searchInputs'>
                <input 
                    id = "input"
                    type = "text"
                    placeholder = {placeholder}
                    onKeyDown = {keyDownHandler}
                    onClick = {clickHandler}
                    value = {wordEntered}
                    onChange = {handleFilter}
                />
                <div className='searchIcon'>
                    { filteredData.length === 0 ? (
                        <SearchIcon id="searchBtn" onClick = {search}/>
                    ) : (
                        <CloseIcon id="clearBtn" onClick = {clearInput}/>
                    )}
                </div>
                {/* <div className='iconOptions'>
                    <div className='celcius' onCLick = {metric}>
                        Metric: °C
                    </div>
                    <div className='fahrenheit' onClick={imperial}>
                        Imperial: °F
                    </div>
                </div> */}
            </div>
            { filteredData.length !== 0 && (
                <div className='dataResult'>
						{ filteredData.map((value , index) => {
							return (
								<div className = 'dataItem' key={index} onClick = {() => {selectItem(value.name)}}>
									<div className='itemDetails'>{value.name}</div>
									<div className='itemDetails'>{value.temp.toFixed()}{unitIcon}</div>
									<div className='itemDetails'><img src={iconUrlFromCode(value.icon)} alt=""/></div>
								</div>	
							);
						})}
                </div>
            )}
        </div>
    );
}

export default SearchBar;

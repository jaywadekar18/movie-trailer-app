import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './styles/navbar.module.css'
import {  FaSearch } from "react-icons/fa";

function Navbar() {
  let navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const dropdownRef = useRef(null)
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSearchResults([])
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('movedown')
    }
  }, [dropdownRef])

  function getResults(keyword) {

    let movieData = axios.get(process.env.REACT_APP_BASE_API + 'search/' + 'movie', {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        query: keyword
      }
    });
    let tvData = axios.get(process.env.REACT_APP_BASE_API + 'search/' + 'tv', {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        query: keyword
      }
    });

    return Promise.all([movieData, tvData])
  }

  function search(e) {
    let keyword = e.target.value
    if (keyword == '') {
      setSearchResults([])
      return true
    }
    getResults(keyword).then(data => {

      let results = data.reduce((acc, curr) => {
        acc.push(...curr.data.results);
        return acc
      }, []);
      setSearchResults(results)
      console.log(results);

    }).catch(err => console.log(err))
  }
  return (
    <div className={styles.navContainer}>
      <span className={styles.heading} onClick={() => navigate('/home')}>The Movie Stop 🎥</span>
      <div className={styles.navLinkContainer}>
        <span className={styles.dropdownContainer}>
          <input type="text" onChange={search} placeholder="Search..." />
          <div className={styles.searchDropdown} ref={dropdownRef}>
            {searchResults?.length > 0 && searchResults.slice(0, 5).map(result => <div onClick={() => {
              navigate(`/content-detail/${result.first_air_date === undefined ? 'movie' : 'tv'}/${result.id}`);
              setSearchResults([])
            }}
              className={styles.searchResult} key={result.id}>
              <div>
                <img className={styles.dropDownImg} src={process.env.REACT_APP_BACKDROP_PATH + result.poster_path} alt="movie/tv" />

              </div>
              <div>{result.name ?? result.title}</div>
            </div>)}
          </div>
          <FaSearch/>
        </span>
        <Link className={styles.navLinks} to='/movies'>Movies</Link>
        <Link className={styles.navLinks} to='/tvshows'>TV Shows</Link>



      </div>

    </div>
  )
}

export default Navbar
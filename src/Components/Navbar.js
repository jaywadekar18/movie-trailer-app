import axios from 'axios';
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from '../styles/navbar.module.css'
import { FaSearch } from "react-icons/fa";
import MovieImg from '../images/MovieImg.jpg'
import * as Constants from '../api/endPoints'
const RESULT_COUNT_SHOWN = 5
function Navbar() {
  let navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const dropdownRef = useRef(null);
  const [keyword, setKeyword] = useState('');
  const inputRef = useRef(null);
  const [expandInput, setExpandInput] = useState(false)
  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };
  const optimizedFn = useCallback(debounce((keyword) => {
    // let keyword = e.target.value;
    setKeyword(keyword);
    //return
    if (keyword == '') {
      setSearchResults([]);
      return
    }

    getResults(keyword).then(data => {

      let results = data.reduce((acc, curr) => {
        acc.push(...curr.data.results);
        return acc
      }, []);
      setSearchResults(results)
      console.log(results);

    }).catch(err => console.log(err))
  }), []);
  function search(e) {
    let keyword = e.target.value;
    setKeyword(e.target.value);
    //return
    // if (keyword == '') {
    //   setSearchResults([])
    //   return true
    // }

  }
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSearchResults([])
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown')
    }
  }, [dropdownRef])

  useEffect(() => {
    function clickedOutsideInput(event) {

      if (inputRef.current && inputRef.current.contains(event.target)) {
        setExpandInput(true)
      }
      else setExpandInput(false)
    }
    document.addEventListener('click', (clickedOutsideInput))
    return () => {
      document.removeEventListener('click')
    }

  }, [])

  function getResults(keyword) {

    let movieData = axios.get(Constants.API.search + Constants.CATEGORY.movie, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        query: keyword
      }
    });
    let tvData = axios.get(Constants.API.search + Constants.CATEGORY.tv, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        query: keyword
      }
    });

    return Promise.all([movieData, tvData])
  }

  return (
    <div className={styles.navContainer}>
      <span className={styles.heading} onClick={() => navigate('/home')}>The Movie Stop 🎥</span>
      <div className={styles.navLinkContainer}>
        <span className={styles.dropdownContainer}>
          <input type="text"
            ref={inputRef}
            className={`${expandInput ? styles.expandInput : null}`}
            onChange={(e) => { optimizedFn(e.target.value) }}
            placeholder="Search..." />
          <div className={styles.searchDropdown} ref={dropdownRef}>
            {searchResults?.length > 0 && searchResults.slice(0, RESULT_COUNT_SHOWN).map((result, index) => {
              if (index + 1 == RESULT_COUNT_SHOWN)
                return <div style={{ textAlign: 'center', backgroundColor: 'grey', borderRadius: 0 }}
                  className={styles.searchResult} key="76786767787" onClick={() => {
                    navigate(`/search/${keyword}`);
                    setSearchResults([])
                  }}>Show more results</div>
              else
                return <div onClick={() => {
                  navigate(`/content-detail/${result.first_air_date === undefined ? 'movie' : 'tv'}/${result.id}`);
                  setSearchResults([])
                }} className={styles.searchResult} key={result.id}>
                  <div>
                    <img className={styles.dropDownImg}
                      src={result.backdrop_path ? (process.env.REACT_APP_BACKDROP_PATH_500 + result.backdrop_path)
                        : MovieImg} alt="movie/tv" />

                  </div>
                  <div style={{ textAlign: 'left' }}>
                    {result.name ?? result.title}
                  </div>
                </div>

            }
            )}
          </div>

          <FaSearch style={{ cursor: 'pointer' }} onClick={() => { if (keyword == '') return; navigate(`/search/${keyword}`) }} />
        </span>
        <Link className={styles.navLinks} to='/movies'>Movies</Link>
        <Link className={styles.navLinks} to='/tvshows'>TV Shows</Link>



      </div>

    </div>
  )
}

export default Navbar
import React, { useState, useEffect } from 'react'
import axios from "axios";
import Movie from './Movie';
import styles from './styles/movies.module.css'

import loader from './images/loader.gif'
const NO_OF_PAGE_TO_SHOW = 2
function TvShows() {
    const [movies, setMovies] = useState([]);
    const [sort, setSort] = useState('popular');
    const [page, setPage] = useState(1);
    const [pageArray, setPageArray] = useState(Array(5).fill(1).map((_, x) => x + 1))
    useEffect(() => {
        fetchMovies();

    }, [sort, page])
    function showNextButtons() {
        if (pageArray.at(pageArray.length - 1) + NO_OF_PAGE_TO_SHOW > movies?.total_pages) return;
        setPageArray(arr => arr.map(ele => ele + NO_OF_PAGE_TO_SHOW))
    }
    async function fetchMovies() {
        console.log('fds');
        let { data } = await axios.get(process.env.REACT_APP_BASE_API + process.env.REACT_APP_TV + `/${sort}`, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
                page: page

            }
        });
        setMovies(data.results);
    }

    return (
        <div >
            <div className={styles.dropdown}>
                <select className={styles.select} value={sort} onChange={e => { setSort(e.target.value); setPage(1) }}>
                    <option value="popular">Popularity</option>
                    <option value="top_rated">Top rated</option>
                    <option value="on_the_air">Now on TV</option>
                </select>
            </div>
            <div className={styles.container}>

                {movies?.length > 0 ? movies.map(movie =>
                    <Movie key={movie.id} movie={movie} />
                ) : <img src={loader} />}


            </div>
            <div className={styles.pageBtnContainer}>
                {
                    pageArray && pageArray.map(pageNo =>
                        <button key={pageNo} onClick={() => setPage(pageNo)}>{pageNo}</button>)
                }
                <button onClick={showNextButtons}>Next</button>
            </div>


        </div>
    )
}

export default TvShows;
import React, { useState, useEffect } from 'react'
import axios from "axios";
import Movie from './Movie';
import styles from './styles/movies.module.css'

import loader from './images/loader.gif'

function Movies() {
    const [movies, setMovies] = useState([]);
    const [sort, setSort] = useState('popular');
    const [page, setPage] = useState(1)
    useEffect(() => {
        fetchMovies();
        console.log('t565656');
    }, [sort, page])

    async function fetchMovies() {
        console.log('fds');
        let { data } = await axios.get(process.env.REACT_APP_BASE_API + process.env.REACT_APP_MOVIE + `/${sort}`, {
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
                    <option value="now_playing">Now in theatre</option>

                    <option value="upcoming">Upcoming</option>
                </select>
            </div>
            <div className={styles.container}>

                {movies?.length > 0 ? movies.map(movie =>
                    <Movie key={movie.id} movie={movie} />
                ) : <img src={loader}/>}


            </div>
            <div className={styles.pageBtnContainer}>
                <button onClick={() => setPage(1)}>1</button>
                <button onClick={() => setPage(2)}>2</button>
                <button onClick={() => setPage(3)}>3</button>
                <button onClick={() => setPage(4)}>4</button>
                <button onClick={() => setPage(5)}>5</button>
            </div>

            
        </div>
    )
}

export default Movies;
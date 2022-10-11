
import React, { useState, useEffect } from 'react'
import axios from "axios";
import Movie from './Movie';
import styles from './styles/movies.module.css'
function TVShows() {
    const [movies, setMovies] = useState([]);
    const [sort, setSort] = useState('popular');
    
    useEffect(() => {
        fetchMovies();
        console.log('t565656');
    }, [sort])
    
    async function fetchMovies() {
        console.log('fds');
        let { data } = await axios.get(process.env.REACT_APP_BASE_API + process.env.REACT_APP_TV + `/${sort}`, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,

            }
        });
        setMovies(data.results);
        
    }
    return (
        <div className={styles.dropdown}>
            <select name="cars" value={sort}  onChange={e => setSort(e.target.value)}>
                <option value="popular">Popularity</option>
                <option value="top_rated">Top rated</option>
                <option value="on_the_air">Now on TV</option>
                
            </select>
            <div className={styles.container}>

                {movies?.length > 0 ? movies.map(movie =>
                    <Movie key={movie.id} movie={movie} />
                ) : 'Loading'}


            </div>
        </div>)
}

export default TVShows
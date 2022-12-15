import React from 'react'
import styles from './styles/movie.module.css'
import { useNavigate, Link } from 'react-router-dom';
import * as Constants from './api/endPoints'
import MovieImg from './images/MovieImg.jpg'
function Movie({ movie }) {
  const navigate = useNavigate();
  return (

    <div className={styles.card} onClick={() => { navigate(`/content-detail/${movie.first_air_date === undefined ? 'movie' : 'tv'}/${movie.id}`) }} >
      <img loading="lazy" className={styles.posterImg} src={ movie.poster_path ? (Constants.API.imageWeb + movie.poster_path) : MovieImg  } alt="" />
      {/* <p className={styles.heading}>{movie.title}</p>
      <p className={styles.info}>{movie.overview}</p> */}
    </div>

  )
}

export default Movie

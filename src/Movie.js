import React from 'react'
import styles from './styles/movie.module.css'
import { useNavigate, Link } from 'react-router-dom';

function Movie({ movie }) {
  const navigate = useNavigate();






  return (

    <div className={styles.card} onClick={() => { navigate(`/content-detail/${movie.first_air_date === undefined ? 'movie' : 'tv'}/${movie.id}`) }} >
      <img className={styles.posterImg} src={process.env.REACT_APP_BACKDROP_PATH + movie.poster_path} alt="" />
      {/* <p className={styles.heading}>{movie.title}</p>
      <p className={styles.info}>{movie.overview}</p> */}
    </div>

  )
}

export default Movie

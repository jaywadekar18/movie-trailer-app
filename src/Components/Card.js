import React from 'react'
import styles from '../styles/card.module.css'
import { useNavigate, Link } from 'react-router-dom';
import * as Constants from '../api/endPoints'
import MovieImg from '../images/MovieImg.jpg'
function Movie({ content }) {
  const navigate = useNavigate();

  return (

    <div className={styles.card} onClick={() => {
      navigate(`/content-detail/${content.first_air_date === undefined ? 'movie' : 'tv'}/${content.id}`)
    }} >
      <img className={styles.posterImg}
        src={content.poster_path ? (Constants.API.cardImageWeb + content.poster_path) : MovieImg} alt="" />
      <div className={styles.details}>
        <p className={styles.heading}>{content.title ?? content.original_name}</p>
        {/* <p className={styles.info}>{content.overview}</p> */}
      </div>
    </div>

  )
}

export default Movie

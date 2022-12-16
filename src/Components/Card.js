import React, {useState} from 'react'
import styles from '../styles/card.module.css'
import { useNavigate, Link } from 'react-router-dom';
import * as Constants from '../api/endPoints'
import MovieImg from '../images/MovieImg.jpg'
function Movie({ content }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false)

  return (

    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className={styles.card} onClick={() => {
      navigate(`/content-detail/${content.first_air_date === undefined ? 'movie' : 'tv'}/${content.id}`)
    }} >
      <img  className={styles.posterImg}
        src={content.poster_path ? (Constants.API.imageWeb + content.poster_path) : MovieImg} alt="" />
      <div className={styles.details} style={{ opacity: hovered ? 1 : 0 }} >
        <p className={styles.heading}>{content.title ?? content.original_name}</p>
        {/* <p className={styles.info}>{content.overview}</p> */}
      </div>
    </div>

  )
}

export default Movie

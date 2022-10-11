import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './styles/navbar.module.css'
function Navbar() {
  let navigate = useNavigate()
  return (   
    <div className={styles.navContainer}>
      <span className={styles.heading} onClick={()=>navigate('/home')}>The Movie Stop 🎥</span>
      <div className={styles.navLinkContainer}>
        <Link className={styles.navLinks} to='/movies'>Movies</Link>
        <Link className={styles.navLinks} to='/tvshows'>TV Shows</Link>
      </div>

    </div>
  )
}

export default Navbar
import React, { useState } from 'react'
import styles from './styles/image-slider.module.css';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
function ImageSlider({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log(images);
  return (
    <div>
      {
        images && images.length > 0 &&

        <div className={styles.imageContainer} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${images[currentIndex].backdrop_path})` }} >
          <button className={styles.leftBtn}><FaChevronLeft /></button>
          <button className={styles.rightBtn} onClick={() => setCurrentIndex(prev => prev + 1)}><FaChevronRight /></button>
        </div>
      }
    </div>

  )
}

export default ImageSlider;


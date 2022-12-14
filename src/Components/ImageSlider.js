import React, { useState, useEffect, useCallback } from 'react'
import styles from '../styles/image-slider.module.css';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import * as Constants from '../api/endPoints'
function ImageSlider({ images, dataSize }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  function increment() {
    if (images.length === currentIndex + 1) setCurrentIndex(0)
    else setCurrentIndex(prev => prev + 1)
  }
  function decrement() {
    if (currentIndex == 0) setCurrentIndex(images.length - 1)
    else setCurrentIndex(prev => prev - 1)
  }
  useEffect(() => {

    let id = setInterval(
        function () {
          setCurrentIndex(prev => {
            if (images.length === prev + 1) return 0
            else return prev + 1
          })
        }
        , 3000);
    return () => clearInterval(id)
  }, [])

  return (
    <div>
      {
        images && images.length > 0 &&

        <div className={styles.imageContainer}
          style={{ backgroundImage: `url(${Constants.API.imageWeb + images[currentIndex]?.backdrop_path})` }} >
          <button className={styles.leftBtn} onClick={decrement}><FaChevronLeft /></button>
          <button className={styles.rightBtn} onClick={increment}><FaChevronRight /></button>
        </div>
      }
    </div>

  )
}

export default ImageSlider;


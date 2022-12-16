import React, { useState, useEffect, useRef, useCallback } from 'react'
import styles from '../styles/card-slider.module.css'
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import * as Constants from '../api/endPoints'
import Card from '../Components/Card'
function CardSlider({ cardData }) {
    const [position, setPosition] = useState(0);
    const [disableRightNavigation, setDisableRightNavigation] = useState(false)
    const navigate = useNavigate()
    const observer = useRef();

    function rightClick() {
        setPosition(prev => prev - 350)

    }
    function leftClick() {
        setPosition(prev => prev + 350)
    }
    const lastElementRef = useCallback(
        function (node) {

            // if (loading) return
            if (observer.current) observer.current.disconnect()
            observer.current = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) {
                    setDisableRightNavigation(true)

                }
                else setDisableRightNavigation(false)
            },
                {
                    threshold: [1]
                }
            )
            if (node) observer.current.observe(node)


        },
        [position]
    )
    return (
        <div className={styles.mainContainer}>

            <button className={styles.sliderButtonsLeft} disabled={position >= 0 ? true : false} onClick={leftClick}>
                <FaChevronLeft fontSize="20px" /></button>
            <div className={styles.cardContainer} style={{ transform: `translateX(${position}px)` }} >
                {
                    cardData && cardData.map((card, index) => {
                        if (cardData.length === index + 1) {


                            return <div key={card.id} ref={lastElementRef}>
                                <Card ref={lastElementRef} content={card} />
                            </div>
                        }

                        else {


                            return<div key={card.id}>
                                <Card content={card} />
                            </div>
                }
                    })

                }
            </div>

            <button className={styles.sliderButtonsRight} onClick={rightClick} disabled={disableRightNavigation}>
                <FaChevronRight fontSize="20px" /> </button>




        </div>
    )
}

export default CardSlider;

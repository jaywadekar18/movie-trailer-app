import React, { useState, useEffect } from 'react'
import styles from './styles/card-slider.module.css'
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft , FaChevronRight} from "react-icons/fa";
import * as Constants from './api/endPoints'
let NO_OF_CARDS_TO_BE_SHOWN = 8
let NO_OF_NEXT_CARDS = 3
function CardSlider({ cardData }) {
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(NO_OF_CARDS_TO_BE_SHOWN);
    const [shownCards, setShownCards] = useState([]);
    const navigate = useNavigate()


    useEffect(() => {
        console.log("startIndex", startIndex);
        console.log("endIndex", endIndex);
        if (startIndex === 0) {

            setShownCards(cardData.slice(startIndex, NO_OF_CARDS_TO_BE_SHOWN))
        }
        else {

            setShownCards(cardData.slice(startIndex, endIndex))
        }

    }, [startIndex])
    function rightClick() {

        if (endIndex + NO_OF_NEXT_CARDS > cardData.length) {
            return
        }
        setStartIndex(prev => prev + NO_OF_NEXT_CARDS);
        setEndIndex(prev => prev + NO_OF_NEXT_CARDS)
    }
    function leftClick() {
        if (startIndex <= 0 ) {
            return
        }
        setStartIndex(prev => prev - NO_OF_NEXT_CARDS); 
        setEndIndex(prev => prev - NO_OF_NEXT_CARDS)
    }
    return (
        <div className={styles.cardContainer}>
            <button onClick={leftClick}><FaChevronLeft fontSize="20px"/></button>
            
            {
                shownCards && shownCards.map(card => <div key={card.id}>
                    <div className={styles.card} onClick={()=>navigate(`/content-detail/${card.first_air_date === undefined ? 'movie' : 'tv'}/${card.id}`)} >
                        <img className={styles.cardImage}
                            src={Constants.API.imageWeb + card.poster_path}
                            alt="image" />

                    </div>

                </div>)

            }
            {
                endIndex + NO_OF_NEXT_CARDS > cardData.length
                    ? <button onClick={()=>navigate('/movies')}>View more</button>
                    :
                    <button onClick={rightClick}><FaChevronRight fontSize="20px"/> </button>
            }
            
            
        </div>
    )
}

export default CardSlider;

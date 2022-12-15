import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import CardSlider from './CardSlider.js'
import styles from './styles/slider.module.css';
import loader from './images/loader.gif'
import * as Constants from './api/endPoints'
function Slider({ content }) {
    const navigate = useNavigate();
    const [data, setData] = useState([])
    useEffect(() => {
        fetchData()
    }, [])
    async function fetchData() {
        let { data } = await axios.get(Constants.API.baseApi + `${content?.contentType === 'tv' ? "tv" : 'movie'}` + `/${content?.category}`, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,

            }
        });

        setData(data.results);

    }
    return (
        <div>
            <p className={styles.heading}>{content?.title}</p>
            {data && data.length > 0 && window.innerWidth > 700 && <CardSlider cardData={data} />}
            {data && data.length > 0 && window.innerWidth <= 700 &&
                <div className={styles.container}>

                    {
                        (data && data.length > 0) ? data?.map(content =>
                            <div className={styles.card} onClick={() => {
                                navigate(`/content-detail/${content.first_air_date === undefined ? 'movie' : 'tv'}/${content.id}`)
                            }}>

                                <img className={styles.cardImage} src={Constants.API.imageWeb + content.poster_path} alt="" />
                            </div>
                        )
                            : <img src={loader} />
                    }

                </div>
            }
        </div>
    )
}

export default Slider;
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import CardSlider from './CardSlider.js'
import styles from './styles/slider.module.css'
function Slider({ content }) {
    const navigate = useNavigate();
    const [data, setData] = useState([])
    useEffect(() => {

        console.log("useeefect");

        fetchData()


    }, [])
    async function fetchData() {
        let { data } = await axios.get(process.env.REACT_APP_BASE_API + `${content?.contentType === 'tv' ? "tv" : 'movie'}` + `/${content?.category}`, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,

            }
        });

        setData(data.results);

    }
    return (
        <div>
        <p className={styles.heading}>{content?.title}</p>
        {data && data.length>0 && window.innerWidth > 700 && <CardSlider cardData={data}/>}
        {data && data.length>0 && window.innerWidth <= 700 && 
             <div className={styles.container}>

                {
                    data?.map(content =>
                        <div className={styles.card} onClick={() => {
                            navigate(`/content-detail/${content.first_air_date === undefined ? 'movie' : 'tv'}/${content.id}`)
                        }}>
                        
                            <img className={styles.cardImage} src={process.env.REACT_APP_BACKDROP_PATH + content.poster_path} alt="" />
                        </div>
                    )
                }

            </div> 
        }
        </div>
    )
}

export default Slider;
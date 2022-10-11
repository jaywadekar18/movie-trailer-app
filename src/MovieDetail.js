import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Modal from './Modal';
import style from './styles/content-detail.module.css'
function ContentDetail() {
    let { id, type } = useParams();
    const [trailerId, setTrailerId] = useState(null);
    const [mediaData, setMediaData] = useState({});
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        fetchContentDetail();
    }, [])
    async function fetchContentDetail() {
        const { data } = await axios.get(process.env.REACT_APP_BASE_API + type + `/${id}`, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
                append_to_response: "videos"
            }
        })

        let trailer = data?.videos?.results?.find(video => video.name === "Official Trailer");

        setMediaData(data)
        if (trailer) {
            setTrailerId(trailer.key);
        }

    }
    return (
        <div className={style.contentContainer} style={{ backgroundImage: `url(${process.env.REACT_APP_BACKDROP_PATH + mediaData.backdrop_path})` }}>
            <div className={style.drop}>
                <img  src={process.env.REACT_APP_BACKDROP_PATH + mediaData?.poster_path} className={style.card} />
                <div className={style.contentData}>
                    <p className={style.title} >{mediaData.original_name ?? mediaData.original_title}</p>
                    <button className={style.trailerBtn} onClick={() => { setShowModal(true) }}>Watch trailer</button>
                </div>

                {
                    showModal && <Modal setShowModal={setShowModal} trailerId={trailerId} />
                }
            </div>
        </div>
    )
}

export default ContentDetail;
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
        window.scrollTo(0, 0)
    }, [id])
    async function fetchContentDetail() {
        const { data } = await axios.get(process.env.REACT_APP_BASE_API + type + `/${id}`, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
                append_to_response: "videos,credits",

            }
        })

        let trailer = data?.videos?.results?.filter(video => video.name.includes("Official Trailer"));


        console.log("trailer", trailer);

        setMediaData(data)
        if (trailer) {
            setTrailerId(trailer[0].key);
        }

    }
    return (
        <>
            <section className={style.contentContainer} style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3),rgba(0, 0, 0, 0.75)),url(${process.env.REACT_APP_BACKDROP_PATH + mediaData.backdrop_path})` }}>
                {/* <div className={style.drop}> */}
                <img src={process.env.REACT_APP_BACKDROP_PATH + mediaData?.poster_path} className={style.card} />
                <div className={style.contentData}>
                    <p className={style.title} >{mediaData.original_name ?? mediaData.original_title}</p>
                    {trailerId && <button className={style.trailerBtn} onClick={() => { setShowModal(true) }}>Watch trailer</button>}
                    {window.innerWidth > 1 && <div className={style.creditsSection}>


                        {mediaData?.credits?.cast?.slice(0, 5)
                            .map((person) => <div className={style.person} key={person.id}>
                                <img className={style.personImg} src={process.env.REACT_APP_BACKDROP_PATH + person?.profile_path} />
                                <p className={style.personName}>{person.name}</p></div>)}
                    </div>}
                </div>

                {
                    showModal && <Modal setShowModal={setShowModal} trailerId={trailerId} />
                }
                {/* </div> */}




            </section>
            {
                mediaData?.videos?.results?.length > 0 &&

                <section >


                    <p className={style.sectionHeading}>Related Videos</p>
                    <div className={style.relatedVideosSection}>


                        {

                            mediaData?.videos?.results?.slice(0, 4).map(video =>
                                <iframe frameBorder="0" src={`https://www.youtube.com/embed/${video.key}`} allowFullScreen> </iframe>)


                        }
                    </div>
                </section>
            }

        </>
    )
}

export default ContentDetail;
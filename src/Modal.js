import React from 'react'
import styles from './styles/modal.module.css';
import { AiOutlineClose } from "react-icons/ai";
function Modal({ setShowModal, trailerId }) {
    return (
        <div className={styles.modal} onClick={()=>{setShowModal(false)}}>
            <div className={styles.modalContent} onClick={(e)=>{e.stopPropagation()}} >



                <button className={styles.closeBtn} onClick={() => setShowModal(false)}><AiOutlineClose icon="fa-sharp fa-solid fa-xmark" /></button>
                {
                    trailerId &&

                    <iframe title='youtubePlayer' id="video" src={`//www.youtube.com/embed/${trailerId}?rel=0&autoplay=1`} frameBorder="0" allowFullScreen></iframe>
                }

            </div>

        </div>
    )
}

export default Modal